(defpackage :tindin.utils
  (:nicknames :utils)
  (:use :cl)
  (:export
    make-id
    from-now))

(in-package :tindin.utils)

(defun make-id ()
  (random 340282366920938463463374607431768211455))

(defun from-now (secs)
  (+ secs (get-universal-time)))
