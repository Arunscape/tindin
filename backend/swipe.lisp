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
        "thanks for the swipe"))

(setf (ningle:route *app* "/api/matches")
      (lambda (params)
        ; TODO sort
        (let ((uid (tindin.login:user-info)))
          (if uid
              (progn
                (db:matches "token")
                "ahhhh")
              '(403 () ("you dont have perms and combs"))))))
