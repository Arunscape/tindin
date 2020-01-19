(defpackage :tindin.database
  (:nicknames :db)
  (:use :cl :cl-dbi)
  (:export
   start
   swipe
   matches
   get-userid-by-email
   create-user
   create-verification-entry
   validate))

(in-package :tindin.database)

(let ((in (open ".tindinrc")))
  (defvar *connection*
    (dbi:connect :mysql
                 :database-name (read in)
                 :username (read in)
                 :password (read in))))

(defun create-verification-entry (email slug)
  (let ((uid (get-userid-by-email email)))
    (dbi:do-sql *connection*
      "INSERT INTO validations (uid, slug, timeout, isUsed) VALUES (?, ?, ?, ?)"
      uid slug (utils:from-now 3600) 0)))


(defun validate (slug)
  (let* ((qstr "SELECT slug FROM validations WHERE slug = ?")
         (query (dbi:prepare *connection* qstr))
         (res (dbi:fetch (dbi:execute query id))))
    (when res
      (dbi:do-sql *connection*
        "UPDATE validations SET isUsed = 1 WHERE slug = ?" slug))
    res))


(defun create-user (name email bio photos)
  (let ((id (utils:make-id)))
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

(defun get-userid-by-email (email)
  (let* ((qstr "SELECT uid, email FROM users WHERE email = ?")
         (query (dbi:prepare *connection* qstr))
         (res (dbi:fetch (dbi:execute query email))))
    (if res (getf res :|uid|) nil)))

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
