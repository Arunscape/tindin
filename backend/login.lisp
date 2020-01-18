(defpackage :tindin.login
  (:use :cl :tindin.api)
  (:export
    #:*app*))

(in-package :tindin.login)

(setf (ningle:route *app* "/login" :method :POST)
      #'(lambda (params)
          (if (authorize (cdr (assoc "username" params :test #'string=))
                         (cdr (assoc "password" params :test #'string=)))
              "Authorized!"
              "Failed...Try again.")))
