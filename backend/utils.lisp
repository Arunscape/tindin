(defpackage :tindin.utils
  (:nicknames :utils)
  (:use :cl)
  (:export
    make-id
    from-now))

(in-package :tindin.utils)

(setf *random-state* (make-random-state t))

(defun make-id ()
  (random (1- (expt 2 61))))

(defun from-now (secs)
  (+ secs (get-universal-time)))
