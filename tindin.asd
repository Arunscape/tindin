(defpackage :tindin-asd
  (:use :cl :asdf))

(in-package :tindin-asd)

(defsystem tindin
  :version "0.0.0"
  :license "AGPL"
  :depends-on (:ningle
               :cl-dbi
               :jose
               :lack-middleware-static
               :lack)
  :components ((:module "backend"
                :components
                ((:file "utils")
                 (:file "lack")
                 (:file "database")
                 (:file "api")
                 (:file "login")
                 (:file "swipe"))))
  :description "the tindin server")
