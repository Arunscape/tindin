cat << EOF | sbcl

(ql:quickload '(clack tindin))
(clack:clackup tindin.api:*app* :use-thread nil)

EOF
