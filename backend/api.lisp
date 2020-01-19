(defpackage :tindin.api
  (:use :cl)
  (:export
   #:*app*
   #:*static-app*))

(in-package :tindin.api)

(defvar *app* (make-instance 'ningle:app))

(defun starts-with (str start)
  (and (>= (length str) (length start))
       (string= start (subseq str 0 (length start)))))

(defvar *static-app*
  (lack:builder
   (lambda (app)
     (let ((static (funcall lack.middleware.static:*lack-middleware-static*
                            app
                            :path "/"
                            :root #P"./frontend/build/")))
       (lambda (env)
         ;(funcall static env))))
         (if (starts-with (getf env :path-info) "/api")
             (funcall app env)
             (funcall static env)))))
   *app*))
