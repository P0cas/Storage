// On the chrome console window
fetch('https://los.rubiya.kr/chall/vampire_e3f1ef853da067db37f342f3a1881156.php?id=admadminin', {
    include: 'credentials'
  }
).then((x) => x.text()).then((x) => console.log(x));
