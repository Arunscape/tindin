(defpackage :tindin-asd
  (:use :cl :asdf))

(in-package :tindin-asd)

(defsystem tindin
  :version "0.0.0"
  :license "AGPL"
  :depends-on (:ningle :cl-dbi :jose)
  :components ((:module "backend"
                :components
                 ((:file "database")
                  (:file "api")
                  (:file "login"))))
  :description "the tindin server")
