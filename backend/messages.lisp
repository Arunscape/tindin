(defpackage :tindin.messages
  (:use :cl :tindin.api))

(in-package :tindin.messages)

(defun add-message (from to message)
  1)


(setf (ningle:route *app* "/api/send-message" :method :POST)
      #'(lambda (params)
          (multiple-value-bind (id email isfull) (tindin.login:user-info)
            (if id
              (let ((to  (cdr (assoc "person" params :test #'string=)))
                    (msg (cdr (assoc "msg" params :test #'string=))))
                msg)
              '(402 nil)))))

(setf (ningle:route *app* "/api/get-messages" :method :POST)
      #'(lambda (params)
          (multiple-value-bind (id email isfull) (tindin.login:user-info)
            (if id
              (let ((person (cdr (assoc "person" params :test #'string=))))
                person)
              '(402 nil)))))
