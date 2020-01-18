(defpackage :tindin.login
  (:use :cl :tindin.api :jose)
  (:export
    #:*app*))

(in-package :tindin.login)

; TODO: Change string to something that can be read from file
(defvar *key* (ironclad:ascii-string-to-byte-array "secret"))


(defun is-valid (token)
  (let* ((tok (jose:decode :hs256 *key* token))
         (email (assoc "email" tok))
         (id (assoc "id" tok)))
    t))

(defun create-token (id email)
  (jose:encode :hs256 *key* (list (cons "email" email)
                                  (cons "id" id))))

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
