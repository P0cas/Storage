from flask import Flask, render_template, request, redirect, session
from random import choice
from string import digits
from hashlib import sha256
import pymysql
import jwt

# 8글자 숫자 난수 생성
def secret():
    n = ""
    poll = digits
    for i in range(8):
        n += str(choice(poll))
    return int(n)

# DB Configuration
db = pymysql.connect(host='localhost', port=3306, user='root', passwd='Wjddnjs1202@', db='flask', charset='utf8')
cursor = db.cursor(pymysql.cursors.DictCursor)
app = Flask(__name__)
app.secret_key = secret()

@app.errorhandler(404)
def page_not_found(error):
    msg = "404 Not Found"
    return render_template('404.html', message=msg)

@app.route("/")
def index():
    if request.method == "GET":
        try:
            sess = session['name']
        except:
            sess = None
        if sess:
            return render_template('indexf.html', name=sess)
        else:
            return render_template('index.html')

@app.route("/login", methods=['GET', 'POST'])
def login():
    if request.method == "GET":
        return render_template('login.html')
    elif request.method == "POST":
        username = request.form.get("id").lower()
        password = request.form.get("pw").lower()

        # DBMS Request
        query = "SELECT * FROM users where id = '{}'".format(username)
        cursor.execute(query)
        result = cursor.fetchone()
        try:
            if result['pw']:
                pass
        except:
            return "<script>alert('존재하지 않는 사용자입니다.');history.go(-1);</script>"

        if(result['pw'] == sha256(password.encode()).hexdigest()):
            session['name'] = result['name']
            session['username'] = username
            return redirect('/')
        else:
            return "<script>alert('비밀번호가 일치하지 않습니다.');history.go(-1);</script>"

# 아이디 중복 확인
def id_check(username):
    query = "SELECT * FROM users where id = '{}'".format(username)
    cursor.execute(query)
    result = cursor.fetchone()
    try:
        if result['id']:
            return True
    except:
        return False

@app.route("/register",methods=['GET', 'POST'])
def register():
    if request.method == "GET":
        return render_template('register.html')
    elif request.method == "POST":
        name ,username, password, repassword  = request.form.get("name").lower(), request.form.get("id").lower(), request.form.get("pw").lower(), request.form.get("rpw").lower()

        if (id_check(username)):
            return "<script>alert('이미 존재하는 사용자 입니다.');history.go(-1);</script>"

        if (password != repassword):
            return "<script>alert('비밀번호가 동일하지 않습니다.');history.go(-1);</script>"
        else:
            query = "insert into users(name, id, pw, Date) values('{}', '{}', '{}', NOW())".format(name, username, sha256(password.encode()).hexdigest())
            cursor.execute(query)
            db.commit()
            return redirect('/login')

if __name__ == '__main__':
    app.run(host="0.0.0.0", port="9999")
