const {taskModel} = require('../modal/pdfModel');
const puppeteer = require('puppeteer');
const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path');
// const templatePath = path.join(__dirname, '..', 'template', 'invoice.html');
const Invoice = require('../modal/invoice');; // Import Invoice model
handlebars.registerHelper('multiply', function (a, b) {
    return (a * b).toFixed(2);
});


const createTask = async (req, res) => {
    console.log(req.user.userId,"LLLLLLLLLLLLLLLL");
    try {
        const products = req.body.products.map(product => ({
            ...product,
            gst: product.rate * 0.18,
            userId: req.user.userId
        }));

        await taskModel.insertMany(products);

        const total = products.reduce((acc, product) => acc + product.rate * product.qty, 0);
        const gstTotal = total * 0.18;
        const grandTotal = total + gstTotal;

        const invoiceData = {
            products,
            total: total.toFixed(2),
            gstTotal: gstTotal.toFixed(2),
            grandTotal: grandTotal.toFixed(2),
            date: new Date().toLocaleDateString(),
            userId: req.user.userId
        };

        const templatePath = path.join(__dirname, '..', 'template', 'invoice.html');
        const templateHtml = fs.readFileSync(templatePath, 'utf8');
        const template = handlebars.compile(templateHtml);
        const html = template(invoiceData);

        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({ format: 'A4' });
        await browser.close();

        // Save the PDF buffer in the database
        const invoice = new Invoice({
            userId: req.user.userId,
            date: new Date(),
            products: products,
            total: total,
            gstTotal: gstTotal,
            grandTotal: grandTotal,
            pdf: pdfBuffer
        });

        await invoice.save();

        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
        res.send(pdfBuffer);

    } catch (error) {
        console.log(error,"?>?>?>?");
        res.status(500).send(error.toString());
    }
}




const getTask = async (req, res) => {
    console.log(req.user,"LLLLLL");
    try {
        const { userId } = req.user;
        if (!userId ) {
            return res.status(403).send('You are not authorized to view these invoices.');
        }

        const invoices = await Invoice.find({ userId: userId });

        if (!invoices || invoices.length === 0) {
            return res.status(404).send('No invoices found for this user.');
        }

        const pdfs = invoices.map(invoice => ({
            id: invoice._id,
            date: invoice.date,
            pdf: invoice.pdf.toString('base64') // Convert Buffer to Base64 string
        }));

        res.json(pdfs);
    } catch (error) {
        res.status(500).send(error.toString());
    }
            
        }

 

module.exports = {
    createTask,
    getTask,
  
    
}


