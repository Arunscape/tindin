(defpackage :tindin.login
  (:use :cl :tindin.api)
  (:export
    #:*app*))

(in-package :tindin.login)

(setf (ningle:route *app* "/checkemail" :method :POST)
      #'(lambda (params)
          (let ((email (cdr (assoc "email" params :test #'string=))))
            (prin1 email))))

(setf (ningle:route *app* "/signup" :method :POST)
      #'(lambda (params)
          (let ((email (cdr (assoc "email" params :test #'string=)))
                (name (cdr (assoc "name" params :test #'string=)))
                (bio (cdr (assoc "bio" params :test #'string=)))
                (photos (cdr (assoc "photos" params :test #'string=))))
            (prin1 email))))

(setf (ningle:route *app* "/signin" :method :POST)
      #'(lambda (params)
          (let ((email (cdr (assoc "email" params :test #'string=))))
            (prin1 email))))

(setf (ningle:route *app* "/validate/:token" :method :GET)
      #'(lambda (params)
          (let ((token (cdr (assoc "token" params :test #'string=))))
            (prin1 token))))

(setf (ningle:route *app* "/upgrade" :method :POST)
      #'(lambda (params)
          (let ((email (cdr (assoc "tok" params :test #'string=))))
            (prin1 email))))
