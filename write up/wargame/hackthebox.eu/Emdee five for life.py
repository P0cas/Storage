import requests
import hashlib

port = int(input("Enter the Port : "))
url = "http://docker.hackthebox.eu:{}/".format(port)
_res, _resLEN, index, FLAG =  [], 0, 0, ""
sess = requests.session()

def Parse(URL):
	global _res, _resLEN
	res = sess.get(URL)
	print("Type : {}".format(type(res)))
	_res = res.text.split('>')
	_resLEN = len(_res)


def Find_Index(LEN):
	global index
	for i in range(0, LEN+1):
		if "<h3" in _res[i]:
			index = i
			break

def _Flag(INDEX):
	FLAG = _res[INDEX+1]
	FLAG = FLAG.split('<')[0]
	FLAG = hashlib.md5(FLAG.encode('utf-8')).hexdigest()
	print("[+] md5 : {}".format(FLAG))
	print("==========================================================================")
	flag = {'hash':FLAG}
	res = sess.post(url, data=flag)
	print("Success!! Get the Flag")
	print("==========================================================================")
	DATA = res.text.split(">")
	for i in range(0, len(DATA)):
		if "HTB" in DATA[i]:
			print("FLAG : {}".format(DATA[i].split("<")[0]))
			break
	print("==========================================================================")

if __name__ == '__main__':
	print("[+] Start")
	Parse(url)
	Find_Index(_resLEN)
	_Flag(index)