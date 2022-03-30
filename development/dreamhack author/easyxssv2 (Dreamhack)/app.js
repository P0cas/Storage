require('./config/generate-db'); // Create database
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(cookieParser());
app.use(express.urlencoded({limit: "50mb", extended: false, parameterLimit:50000}));
app.use(express.static('static'));

app.use('/', require('./routers/index.js'));
app.use('/api', require('./api/index.js'));
app.use('/accounts', require('./routers/accounts.js'));

app.listen(process.env.PORT, () => {
    console.log(`[+] http://127.0.0.1:${process.env.PORT}`);
});