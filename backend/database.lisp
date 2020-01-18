(defpackage :tindin-database
  (:use :cl :cl-dbi)
  (:export
    start))

(in-package :tindin-database)

(let ((in (open ".tindinrc")))
  (defvar *connection*
    (dbi:connect :mysql
                 :database-name (read in)
                 :username (read in)
                 :password (read in)))
  (defvar *ahh* (read in)))

(defun start ()
  (princ *ahh*))
