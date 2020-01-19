(defpackage :tindin.login
  (:use :cl :tindin.api :jose)
  (:export
   #:*app*
   user-info))

(in-package :tindin.login)

; TODO: Change string to something that can be read from file
(defvar *key* (ironclad:ascii-string-to-byte-array "secret"))
(defparameter *domain* "localhost:5000")


(defun get-from-token (token value)
  (let ((tok (jose:decode :hs256 *key* token)))
    (cdr (assoc value tok :test #'string=))))

(defun is-valid (token)
  (handler-case
    (let* ((tok (jose:decode :hs256 *key* token))
           (email (cdr (assoc "email" tok :test #'string=)))
           (id (cdr (assoc "id" tok :test #'string=))))
        (values id email))
    (jose/errors:jws-verification-error ()
      nil)))

(defun is-privilaged (token)
  (let* ((tok (jose:decode :hs256 *key* token))
         (email (assoc "email" tok))
         (id (assoc "id" tok))
         (isfull (assoc "isfull" tok)))
    isfull))

(defun user-info ()
  (let ((tok (gethash "authorization"
                      (lack.request:request-headers ningle:*request*))))
    (is-valid tok)))

(defun create-token (id email isfull)
  (jose:encode :hs256 *key* (list (cons "email" email)
                                  (cons "id" id)
                                  (cons "isfull" isfull))))

(defun verify-email-process (email)
  (let ((slug (utils:make-id)))
    (prin1 slug)
    (terpri)

    (db:create-verification-entry email slug) ; stores link in database

    (send:email email "Verify your Email"
                (concatenate 'string "Click the link to verify your email"
                             (format nil "~%http://~A/api/validate/~A~%"
                                     *domain* slug)))
    (list 200 nil (list (create-token (db:get-userid-by-email email) email nil)))))


(defun upgrade-or-error (tok)
  (if (and (is-valid tok) (db:has-current-validation (is-valid tok)))
    (let ((email (get-from-token tok "email"))
          (id (get-from-token tok "id")))
      (prin1 tok)
      (terpri)
      (let ((t2 (create-token id email t)))
        (prin1 t2)
        (terpri)
        (list 200 nil (list t2))))))

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
            (db:create-user name email bio photos)
            (verify-email-process email))))

(setf (ningle:route *app* "/api/signin" :method :POST)
      #'(lambda (params)
          (let ((email (cdr (assoc "email" params :test #'string=))))
            (verify-email-process email))))

(setf (ningle:route *app* "/api/validate/:token" :method :GET)
      #'(lambda (params)
          (let ((token (cdr (assoc :token params))))
            (format t "~A~%" token)
            (if (db:validate token)
                '(200 nil ("Success!"))
                '(400 nil ("You Fool!"))))))

(setf (ningle:route *app* "/api/upgrade" :method :POST)
      #'(lambda (params)
          (let ((tok (cdr (assoc "tok" params :test #'string=))))
            (upgrade-or-error tok))))
