cat << EOF | sbcl

(ql:quickload '(clack tindin))
(clack:clackup tindin.api:*static-app* :use-thread nil)

EOF
