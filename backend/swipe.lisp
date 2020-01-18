(defpackage :tindin.swipe
  (:use :cl :tindin.api)
  (:export
    #:*app*))

(in-package :tindin.swipe)

(setf (ningle:route *app* "/swipe" :method :POST)
      (lambda (params)
        (db:swipe (cdr (assoc "swiper" params :test #'string=))
                  (cdr (assoc "swipee" params :test #'string=))
                  (cdr (assoc "dir" params :test #'string=)))
        "thanks for the swipe"))

(setf (ningle:route *app* "/matches")
      (lambda (params)
        ; TODO sort
        (db:matches "token")
        "ahhhh"))
