(defpackage :tindin.login
  (:use :cl :tindin.api)
  (:export
    #:*app*))

(in-package :tindin.login)

(setf (ningle:route *app* "/checkemail" :method :POST)
      #'(lambda (params)
          (let ((email (cdr (assoc "email" params :test #'string=))))
            (princ email))))
