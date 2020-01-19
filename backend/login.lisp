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

(defun is-privilaged (token)
  (let* ((tok (jose:decode :hs256 *key* token))
         (email (assoc "email" tok))
         (id (assoc "id" tok))
         (isfull (assoc "isfull" tok)))
    isfull))

(defun create-token (id email isfull)
  (jose:encode :hs256 *key* (list (cons "email" email)
                                  (cons "id" id)
                                  (cons "isfull" isfull))))

(defun verify-email-process (email)
  (let ((slug (utils:make-id)))
    (prin1 slug)
    (terpri)

    (db:create-verification-entry email slug)) ; stores link in database
  3 ; sends link with email
  "AHHHH") ; return t


(defun create-user-account (name email bio photos)
  (db:create-user name email bio photos))

(setf (ningle:route *app* "/api/checkemail" :method :POST)
      #'(lambda (params)
          (let ((email (cdr (assoc "email" params :test #'string=))))
            (list (if (db:get-userid-by-email email) 204 404) nil))))

(setf (ningle:route *app* "/api/signup" :method :POST)
      #'(lambda (params)
          (let ((email (cdr (assoc "email" params :test #'string=)))
                (name (cdr (assoc "name" params :test #'string=)))
                (bio (cdr (assoc "bio" params :test #'string=)))
                (photos (cdr (assoc "photos" params :test #'string=))))
            (create-user-account name email bio photos)
            (verify-email-process email))))

(setf (ningle:route *app* "/api/signin" :method :POST)
      #'(lambda (params)
          (let ((email (cdr (assoc "email" params :test #'string=))))
            (verify-email-process email))))

(setf (ningle:route *app* "/api/validate/:token" :method :GET)
      #'(lambda (params)
          (let ((token (cdr (assoc "token" params :test #'string=))))
            (db:validate token))))

(setf (ningle:route *app* "/api/upgrade" :method :POST)
      #'(lambda (params)
          (let ((email (cdr (assoc "tok" params :test #'string=))))
            (prin1 email))))
