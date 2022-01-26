## Memo Service

---
#### RSA shared key conflict

```
ssh-keygen -R ip
```

---
#### Frida Command

```
pip install frida
pip install frida-server

Check a version of frida after to install frida-server
frida --version (e.g 12.9.7)

And Check an information of your phone(Nox)-32/64 bit
nox_adb shell
getprop ro.product.cpu.abi (e.g x86)

If you complete to check, Let's go to install a frida-server. Above case, The frida version is 12.9.7 and 32bit. So We able to install from https://github.com/frida/frida/releases/download/12.9.7/frida-server-12.9.7-android-x86.xz

After to install file of frida-server
nox_adb push frida-server-12.9.7-android-x86 /data/local/tmp
nox_adb shell
cd /data/local/tmp; ls
 > frida-server-12.9.7-android-x86

Finally, Execute a frida server
chmod 777 frida-server-12.9.7-android-x86
./frida-server-12.9.7-android-x86 &

Connect to server using the frida
frida-ps -U
```

---
#### Docker Command
```
apt-get install docker-ce docker-ce-cli containerd.io
docker -v

docker build --tag <name>:<version> .
docker-compose up
docker-compose up -d
docker exec -it <con-id> /bin/sh

docker images
docker ps

docker stop $(docker ps -a -q)
docker rmi $(docker images)
```

---
#### Apache 2 Install
```
apt install apache2
apt install php

service apache2 start
service apache2 stop
service apache2 restart
```

---
#### Port Open
```
iptables -I INPUT 1 -p tcp --dport <PORT> -j ACCEPT
```

---
#### ZSH Install
```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
brew install zsh
chsh -s $(which zsh)
brew install curl
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

---
#### Node Install
```
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
apt install -y node.js
```

---
#### Hexo Install
```
npm install hexo-cli -g
hexo init <your dir name>
cd <your dir name>
npm install

git clone https://github.com/<theme path> themes/<theme name>

pocas : Install the theme, open the config file and change the theme variable

hexo g; hexo d
```

---
#### puppeteer setting file Install

```
apt-get install -y gconf-service libasound2 libatk1.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget libgbm1
```

---
#### Git Command

```
git init
git add .
git commit -m "test"
git remote add origin <repo url>
git push -u origin main

git config credential.helper store --global
git config credential.helper 'cache --timeout=9999999999'
```

---







