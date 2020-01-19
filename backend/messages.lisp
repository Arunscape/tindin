(defpackage :tindin.messages
  (:use :cl :tindin.api))

(in-package :tindin.messages)

(defun add-message (from to message)
  (db:send-message from to message)
  '(200 nil))

(defun get-messages (you them)
  (list 200 nil (list (db:get-messages you them 100)
                      (db:get-messages them you 100))))


(setf (ningle:route *app* "/api/send-message" :method :POST)
      #'(lambda (params)
          (multiple-value-bind (id email isfull) (tindin.login:user-info)
            (if id
              (let ((to  (cdr (assoc "person" params :test #'string=)))
                    (msg (cdr (assoc "msg" params :test #'string=))))
                (add-message id to msg))
              '(402 nil)))))

(setf (ningle:route *app* "/api/get-messages" :method :POST)
      #'(lambda (params)
          (multiple-value-bind (id email isfull) (tindin.login:user-info)
            (if id
              (let ((person (cdr (assoc "person" params :test #'string=))))
                (get-messages id person))
              '(402 nil)))))
