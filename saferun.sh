while true
do
    bash runbackend.lisp &
    sleep 5
    kill $!
done
