(defpackage :tindin.email
  (:nicknames :mail)
  (:use :cl :cl-dbi :cl-smtp :cl+ssl)
  (:export
   start
   swipe
   matches
   get-user-by-email))

(in-package :tindin.email)

(defparameter +config-file+ ".emailconfig")

(defun get-config ()
  (with-open-file (config +config-file+)
    (list :usr (read config) :pass (read config))))

(defun email (to subject message)
  (let ((conf (get-config)))
    (cl-smtp:send-email "smtp.gmail.com"
                        (getf (get-config) :usr) to
                        subject message
                        :authentication (list (getf conf :usr)
                                              (getf conf :pass)) :ssl :tls)))

