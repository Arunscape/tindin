(defpackage :tindin.swipe
  (:use :cl :tindin.api)
  (:export
    #:*app*))

(in-package :tindin.swipe)

(setf (ningle:route *app* "/api/swipe" :method :POST)
      (lambda (params)
        (db:swipe (cdr (assoc "swiper" params :test #'string=))
                  (cdr (assoc "swipee" params :test #'string=))
                  (cdr (assoc "dir" params :test #'string=)))
        "thanks for the swipe mate"))

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
