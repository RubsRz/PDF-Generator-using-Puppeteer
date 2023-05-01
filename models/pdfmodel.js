const puppeteer = require('puppeteer')
const path = require('path')

exports.generatepdf = async(req) => {
    // console.log(req.body.participant)
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    // console.log('file://' + __dirname + '/plantilla.html')
    const filePath = path.join(__dirname, '..', 'scripts', 'pdfs');
    await page.goto('file://' + filePath + '/plantilla.html');
  
  
    // Espera a que se cargue el elemento #diploma
    await page.waitForSelector('#diploma');
  
    // Actualiza los valores dinámicos con los parámetros recibidos
    const data = {
      name: req.body.name.toUpperCase(),
      course: req.body.average.toUpperCase(),
      date: req.body.dateformat.toUpperCase(),
    };
    
  
    await page.evaluate((data) => {
    // Actualiza el valor del elemento #name
    document.querySelector('#name').textContent = data.name;
    // Actualiza el valor del elemento #course
    document.querySelector('#course').textContent = data.course;
    // Actualiza el valor del elemento #date
    document.querySelector('#date').textContent = data.date;
    }, data);
  
    // Toma una captura de pantalla para verificar que se está renderizando correctamente
    await page.screenshot({ path: filePath + '/screenshot.png' });
  
    // Espera a que se actualice la página
    await page.waitForSelector('#date', {text: data.date });
  
    // Darle un nombre al PDF
    pdfname = `${data.name}.pdf`
    
    // Genera el PDF con el tamaño adecuado
    const pdf = await page.pdf({
    path: filePath + '/' + pdfname,
    printBackground: true,
    format: 'A4',
    landscape: true
    });
  
    await browser.close();
  
  
    return pdfname
  }