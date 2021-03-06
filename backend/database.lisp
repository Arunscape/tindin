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
   has-current-validation
   validate
   send-message
   get-messages
   swiped-on-you
   unswiped
   get-user))

(in-package :tindin.database)

(let ((in (open ".tindinrc")))
  (defvar *connection*
    (dbi:connect :mysql
                 :database-name (read in)
                 :username (read in)
                 :password (read in))))

(defun has-current-validation (id)
  (let* ((qstr "SELECT * FROM validations WHERE timeout > NOW() AND uid = ? AND isUsed=1")
         (query (dbi:prepare *connection* qstr))
         (res (dbi:fetch (dbi:execute query id))))
    res))

(defun create-verification-entry (email slug)
  (let ((uid (get-userid-by-email email)))
    (dbi:do-sql *connection*
      "INSERT INTO validations (uid, slug, timeout, isUsed) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL 2 HOUR), ?)"
      uid slug 0)))


(defun validate (slug)
  (let* ((qstr "SELECT slug FROM validations WHERE slug = ?")
         (query (dbi:prepare *connection* qstr))
         (res (dbi:fetch (dbi:execute query slug))))
    (format t "~A~%" res)
    (when res
      (dbi:do-sql *connection*
        "UPDATE validations SET isUsed = 1 WHERE slug = ?" slug))
    res))


(defun create-user (name email bio photos)
  (let ((id (utils:make-id)))
    (dbi:do-sql *connection*
      "INSERT INTO users (uid, uname, email, bio) VALUES (?, ?, ?, ?)"
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

(defun get-user-photos (id)
  (let* ((qstr "SELECT DISTINCT url FROM photos WHERE uid=?")
         (query (dbi:execute (dbi:prepare *connection* qstr) id)))
    (loop for row = (dbi:fetch query)
       while row
       collect (getf row :|url|))))

(defun get-user (id)
  (let* ((qstr "SELECT uid, email, uname, bio FROM users WHERE uid = ?")
         (query (dbi:prepare *connection* qstr))
         (res (dbi:fetch (dbi:execute query id))))
    (setf (getf res :|photos|) (get-user-photos id))
    res))

(defun get-userid-by-email (email)
  (let* ((qstr "SELECT uid, email FROM users WHERE email = ?")
         (query (dbi:prepare *connection* qstr))
         (res (dbi:fetch (dbi:execute query email))))
    (if res (getf res :|uid|) nil)))

(defun swipe (swiper swipee theta)
  "the swiper swipes in direction theta on swipee"
  (let* ((qstr "SELECT direction FROM swipes WHERE swiper = ? AND swipee = ?")
         (query (dbi:prepare *connection* qstr))
         (res (dbi:fetch (dbi:execute query swiper swipee))))
    (format t "~A~%" res)
    (unless res
      (dbi:do-sql *connection*
        "INSERT INTO swipes (swiper, swipee, direction) VALUES (?, ?, ?)"
        swiper swipee theta)))
  t)

(defun matches (userid)
  (let* ((qstr "SELECT DISTINCT s1.swiper, s1.direction as d1,
               s2.direction as d2 FROM
               swipes s1, swipes s2 WHERE s2.swiper=? AND s2.swipee=s1.swiper
               AND s1.swipee=?")
         (query (dbi:execute (dbi:prepare *connection* qstr) userid userid)))
    (loop for row = (dbi:fetch query)
       while row
       collect `(("swiper" . ,(getf row :|swiper|))
                 ("them" . ,(getf row :|d1|))
                 ("you" . ,(getf row :|d2|))))))

(defun get-messages (from to n)
  (let* ((qstr "SELECT DISTINCT u_from, u_to, msg, time
                  FROM messages
                  WHERE u_from=? AND u_to=?
                  SORT BY timestamp DESC
                  LIMIT ?")
         (query (dbi:execute (dbi:prepare *connection* qstr) from to n)))
    (loop for row = (dbi:fetch query)
       while row
       collect `(("from" . ,(getf row :|u_from|))
                 ("to" . ,(getf row :|u_to|))
                 ("msg" . ,(getf row :|msg|))
                 ("time" . ,(getf row :|time|))))))

(defun send-message (from to msg)
  (dbi:do-sql *connection*
    "INSERT INTO messages (u_to, u_from, msg, timestamp) VALUES (?, ?, ?, NOW())"
    from to msg))

(defun swiped-on-you (uid)
  (let* ((qstr "SELECT swiper FROM swipes WHERE swipee=? and swiper not in
                (SELECT swipee FROM swipes WHERE swiper=?)")
         (query (dbi:prepare *connection* qstr))
         (res (dbi:fetch (dbi:execute query uid uid))))
    (if res (getf res :|swiper|) nil)))

(defun unswiped (uid)
  (let* ((qstr "SELECT uid FROM users WHERE uid != ? and uid not in
                (SELECT swipee FROM swipes WHERE swiper=?)")
         (query (dbi:prepare *connection* qstr))
         (res (dbi:fetch (dbi:execute query uid uid))))
    (if res (getf res :|uid|) nil)))
