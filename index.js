const fs = require('fs');
const http = require('http');
const url = require('url');
const replaceTemplate = require('./modules/replaceTemplate');

// FILE
// Blocking, synchronous way
// const textIn = fs.readFileSync('./txt/input.txt', 'utf8');
// console.log(textIn);
// const textOut = `This is what we know aout the avocado: ${textIn}. \nCreated on ${Date.now()}`;
// console.log(textOut);
// fs.writeFileSync('./txt/output.txt', textOut);
// console.log('File was written!');

// Non-blocking, asynchonous way
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('ERROR! ###');
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         //console.log(data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             console.log(data2 + '\n\n' + data3);

//             fileData = `${data2}\n\n\n${data3}`;

//             fs.writeFile('./txt/final.txt', fileData, 'utf-8', (err) => {
//                 console.log('Your file has been written ###');
//             });
//         });
//     });
// });

//////////////////////////////////////
// SERVER

const tempOverview = fs.readFileSync(
    `${__dirname}/templates/template-overview.html`,
    'utf-8'
);
const tempCard = fs.readFileSync(
    `${__dirname}/templates/template-card.html`,
    'utf-8'
);
const tempProduct = fs.readFileSync(
    `${__dirname}/templates/template-product.html`,
    'utf-8'
);

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
    //console.log(req.url);
    //console.log(url.parse(req.url, true));
    const { query, pathname } = url.parse(req.url, true);

    //const { query, pathname } = url.parse(req.url); // if true - query will be as object
    //console.log(query.id, pathname);

    //const pathName = req.url;
    //console.log('this is pathName:  ', pathName);

    // Overview page
    if (pathname === '/' || pathname === '/overview') {
        //res.end('This is the Overview');
        res.writeHead(200, { 'content-type': 'text/html' });

        const cardsHtml = dataObj
            .map((el) => replaceTemplate(tempCard, el))
            .join('');

        const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);

        // Product page
    } else if (pathname === '/product') {
        res.writeHead(200, { 'content-type': 'text/html' });
        const product = dataObj[query.id];
        output = replaceTemplate(tempProduct, product);
        res.end(output);

        // API
    } else if (pathname === '/api') {
        // fs.readFile(`${__dirname}/dev-data/data.json`, 'utf-8', (err, data) => {
        //     const productData = JSON.parse(data);
        //     //console.log(productData);
        //     res.writeHead(200, { 'content-type': 'application/json' });
        //     res.end(data);
        // });
        //res.end('<h1>API</h1>');
        res.writeHead(200, { 'content-type': 'application/json' });
        res.end(data);

        // Not found
    } else {
        res.writeHead(404, {
            'Content-type': 'text/html',
            'my-own-header': 'hello-world',
        });
        res.end('<h1>Page not found!</h1>');
    }
    //res.end('Hello from the server! req.url');
});

server.listen(8000, () => {
    console.log(`Listening to request on port 8000 http://localhost:8000`);
    //console.log(localhost);
});
