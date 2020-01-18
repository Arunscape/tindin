(defpackage :tindin.database
  (:nicknames :db)
  (:use :cl :cl-dbi)
  (:export
   start
   swipe
   matches))

(in-package :tindin.database)

(let ((in (open ".tindinrc")))
  (defvar *connection*
    (dbi:connect :mysql
                 :database-name (read in)
                 :username (read in)
                 :password (read in)))
  (defvar *ahh* (read in)))

(defun start ()
  (princ *ahh*))

(defun swipe (swiper swipee theta)
  "the swiper swipes in direction theta on swipee"
  (prin1 swiper)
  (terpri)
  (prin1 swipee)
  (terpri)
  (prin1 theta)
  (terpri)
  t)

(defun matches (userid)
  t)
