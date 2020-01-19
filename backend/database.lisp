(defpackage :tindin.database
  (:nicknames :db)
  (:use :cl :cl-dbi)
  (:export
   start
   swipe
   matches
   get-user-by-email))

(in-package :tindin.database)

(let ((in (open ".tindinrc")))
  (defvar *connection*
    (dbi:connect :mysql
                 :database-name (read in)
                 :username (read in)
                 :password (read in))))

(defun create-user (name email bio photos)
  (let ((id (random 340282366920938463463374607431768211455)))
    (dbi:do-sql *connection*
      "INSERT INTO users (id, uname, email, bio) VALUES (?, ?, ?, ?)"
      id name email bio)
    (loop for photo in photos do
         (dbi:do-sql *connection*
           "INSERT INTO photos (uid, url) VALUES (?, ?)"
           id photo))
    (list
     :|uid| id
     :|name| name
     :|email| email
     :|bio| bio
     :|photos| photos)))

(defun get-user (id)
  (let* ((qstr "SELECT uid, email, uname, bio FROM users WHERE uid = ?")
         (query (dbi:prepare *connection* qstr))
         (res (dbi:fetch (dbi:execute query id))))
    ; TODO: add photos
    (prin1 res)
    res))

(defun get-user-by-email (email)
  (let* ((qstr "SELECT uid, email, uname, bio FROM users WHERE email = ?")
         (query (dbi:prepare *connection* qstr))
         (res (dbi:fetch (dbi:execute query email))))
    ; TODO: add photos
    (prin1 res)
    res))

(defun swipe (swiper swipee theta)
  "the swiper swipes in direction theta on swipee"
  (prin1 swiper)
  (terpri)
  (prin1 swipee)
  (terpri)
  (prin1 theta)
  (terpri)
  t)

(defun matches (userid)
  t)
