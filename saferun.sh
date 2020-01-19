while true
do
    bash runbackend.lisp &
    sleep 300
    kill $!
done
