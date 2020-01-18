(in-package :lack.app.file)

; idgaf
(defun locate-file (path root)
  (when (find :up (pathname-directory path) :test #'eq)
    (error 'bad-request))

  (let ((file (merge-pathnames path root)))
    (cond
      ((position #\Null (namestring file))
       (error 'bad-request))
      ((uiop:directory-exists-p file)
       (locate-file (merge-pathnames path "index.html") root))
      ((not (and (ignore-errors
                  ;; Ignore simple-file-error in a case that
                  ;; the file path contains some special characters like "?".
                  ;; See https://github.com/fukamachi/clack/issues/111
                  (uiop:file-exists-p file))
                 (not (uiop:directory-exists-p file))))
       (error 'not-found))
      (t file))))
