FROM ubuntu:18.04

RUN apt-get update && apt-get install -y sbcl curl libssl-dev nodejs

RUN curl -O https://beta.quicklisp.org/quicklisp.lisp && \
    sbcl --load quicklisp.lisp --eval '(quicklisp-quickstart:install)'\
    --eval '(ql-util:without-prompting (ql:add-to-init-file))' --quit

RUN curl -o- -L https://yarnpkg.com/install.sh | bash

RUN sbcl --eval "(ql:quickload '(:clack :ningle :lack :cl-dbi :jose))" --quit

WORKDIR /root/quicklisp/local-projects/tindin/frontend
COPY frontend/package.json frontend/yarn.lock ./
RUN $HOME/.yarn/bin/yarn install
COPY ./frontend ./
RUN $HOME/.yarn/bin/yarn build

WORKDIR /root/quicklisp/local-projects/tindin/
COPY . ./

#RUN sbcl --eval '(ql:quickload :tindin)' --quit

CMD sbcl --eval "(ql:quickload '(:clack :tindin))" \
    --eval '(clack:clackup tindin.api:*static-app* :use-thread nil :address "0.0.0.0" :port 80)' \
    --quit