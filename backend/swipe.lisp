(defpackage :tindin.swipe
  (:use :cl :tindin.api)
  (:export
    #:*app*))

(in-package :tindin.swipe)

(setf (ningle:route *app* "/api/next-profile")
      (lambda (params)
        (declare (ignore params))
        (let ((uid (tindin.login:user-info)))
          (if uid
              `(200
                (:content-type "application/json")
                (,(json:encode-json-to-string
                   (let ((id (or (db:swiped-on-you uid)
                                 (db:unswiped uid))))
                     (if id
                         (let ((user (db:get-user id)))
                           (list
                             (cons "name" (getf user :|uname|))
                             (cons "id" (getf user :|uid|))
                             (cons "bio" (getf user :|bio|))
                             (cons "photos" (getf user :|photos|))))
                         nil)))))

            '(403 () ("oi! log in ya bastard!"))))))

(setf (ningle:route *app* "/api/swipe" :method :POST)
      (lambda (params)
        (let ((uid (tindin.login:user-info)))
          (if uid
              (progn
                (db:swipe uid
                          (cdr (assoc "swipee" params :test #'string=))
                          (cdr (assoc "dir" params :test #'string=)))
                '(200 nil ("thanks for the swipe mate")))
            '(403 () ("faaaaaack off m8"))))))


(defun deg->rad (x) (* x (/ pi 180)))

(defun is-match (th1 th2)
  (let ((x1 (cos (deg->rad th1)))
        (x2 (cos (deg->rad th2)))
        (y1 (sin (deg->rad th1)))
        (y2 (sin (deg->rad th2))))
    (or (and (> x1 0) (> x2 0))
        (and (> y1 0) (> y2 0)))))

(setf (ningle:route *app* "/api/matches")
      (lambda (params)
        ; TODO sort
        (let ((uid (tindin.login:user-info)))
          (if uid
              `(200
                (:content-type "application/json")
                (,(json:encode-json-to-string
                   (remove-if-not
                    (lambda (match)
                      (is-match (cdr (assoc "them" match :test #'string=))
                                (cdr (assoc "you" match :test #'string=))))
                    (db:matches uid)))))
              '(403 () ("you dont have perms and combs"))))))
