var members;
var nubmer_member;

fetch('/api/members').then((x) => x.text()).then((x) => members = JSON.parse(x));


setTimeout(()=> {
    console.log('[+] Retrieving member information..');
    members.shift();

    nubmer_member = members.length;
    console.log(`[+] Number of member : ${nubmer_member}`);

    console.log('[+] Creating div tags..')
    members.forEach(element => {
        div = document.createElement('div');
        div1 = document.createElement('div');
    
        div.className = 'card mb-4 py-3 border-left-primary';
        div.id = 'parents';
    
        div1.className = 'card-body';
        div1.innerHTML = `아이디 : *******${element.username.slice(8)}<br> 이메일 : *******${element.email.slice(8)}`;
        div.appendChild(div1);
        document.getElementById('members').appendChild(div);
    });
}, 1000);