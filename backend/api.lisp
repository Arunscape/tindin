(defpackage :tindin.api
  (:use :cl)
  (:export
    #:*app*))

(in-package :tindin.api)

(defvar *app* (make-instance 'ningle:app))

(setf (ningle:route *app* "/")
      "Welcome to ningle!")


