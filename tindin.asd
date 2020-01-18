(defpackage :tindin-asd
  (:use :cl :asdf))

(in-package :tindin-asd)

(defsystem tindin
  :version "0.0.0"
  :license "AGPL"
  :depends-on (:ningle)
  :components ((:module "backend"
                :components
                 ((:file "api"))))
  :description "the tindin server")
