const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true, });
const fs = require('fs');

const user_name = 'alvaroscelza@gmail.com';
const password = 'password';

let photo = fs.readFileSync('Fotos/Test 1.png').toString();

let content = fs.readFileSync('contenido.txt').toString();
let content_array = content.split('\r\n\r\n');
let title = content_array[0];
let price = content_array[1];
let description = '';
for (let index = 2; index < content_array.length; index++) {
    const element = content_array[index];
    description += element + "\r\n\r\n"
}

nightmare.goto('https://www.facebook.com/')
    .wait('#email')
    .type('#email', user_name)
    .type('#pass', password)
    .click('#loginbutton')
    .wait('#bluebarRoot')
    .goto('https://www.facebook.com/marketplace/create/item/')

    //Titulo
    .type('#jsc_c_1', title)

    //Precio
    .type('#jsc_c_3', price)

    //Categoria
    .evaluate(() => {
        document.querySelectorAll("[aria-label='Categoría']")[0].click();
    })
    .wait(500)
    .evaluate(() => {
        let xpath = "//span[text()='Hogar']";
        let home = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        home.click()
    })
    .wait(500)

    //Descripcion
    .type('#jsc_c_7', description)
    
    //Fotos


    //Siguiente
    .evaluate(() => {
        let xpath = "//span[text()='Siguiente']";
        let next = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        next.click()
    })
    .then();
