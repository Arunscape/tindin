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

(defun cors (app)
  (lambda (env)
    (if (equal (getf env :REQUEST-METHOD) :OPTIONS)
        '(204
          (:access-control-allow-methods
           "GET, POST, PUT, DELETE, OPTIONS, HEAD"
           :access-control-allow-origin "*"
           :access-control-allow-headers
           "Origin, X-Requested-With, Content-Type, Accept")
          ())
        (let ((r (funcall app env)))
          (setf (cadr r) (append '(:access-control-allow-methods
                                   "GET, POST, PUT, DELETE, OPTIONS, HEAD"
                                   :access-control-allow-origin "*"
                                   :access-control-allow-headers
                                   "Origin, X-Requested-With, Content-Type, Accept")
                                 (cadr r)))
          r))))

(defvar *static-app*
  (lack:builder
   #'cors
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
