import hashlib

for i in range(100000000):
	Hash = hashlib.sha1()
	Hash.update(str(i).encode('utf-8'))
	if "7c00" in Hash.hexdigest()[:4]:
		print("[+] Before SHA-1 : {}".format(str(i)))
		print("[+] After SHA-1 : {}".format(Hash.hexdigest()))
		c['c'] = str(i)
		break