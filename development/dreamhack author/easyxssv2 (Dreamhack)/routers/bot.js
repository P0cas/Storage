const puppeteer = require('puppeteer');
const parser = require('url');

const bot = async function (url){
    let href_url = '';
    const parsed = parser.parse(url);

    if (parsed.hostname === null) {
        if (parsed.pathname !== null) {
            // If only pathname exists, it is the same origin. | fetch('/same'); are same to fetch('http://localhost/same');
            href_url = parsed.href;
        }
    } else {
        if (parsed.hostname === 'youtube.com') { 
            href_url = parsed.href;
        } else {
            href_url = 'https://google.com';
        }
    }
    try{
        const browser = await puppeteer.launch({ 
            headless: true, 
            args: ['--no-sandbox', '--disable-web-security', '--disable-setuid-sandbox'],
        });
        page = await browser.newPage('http://127.0.0.1:80');
        await page.goto(`${href_url}`);

        setTimeout(() => {
            browser.close();
        }, 4000);

    } catch (err) {
        console.log(`err : ${err}`);
    }
}

module.exports = bot;