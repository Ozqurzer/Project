import puppeteer from 'puppeteer';

export default async function pdf(data,res) {
    try{
        let htmlContent = `
<html>
<head>
    <title>Data JSON</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
        }
        .content {
            max-width: 800px;
            margin: 0 auto;
        }
        .header {
            text-align: center;
            border-bottom: 1px solid #e0e0e0;
            margin-bottom: 20px;
        }
        .item {
            margin-bottom: 10px;
        }
    </style>
</head>
<body>
    <div class="content">
        <div class="header">
            <h1>Tutoring Protokoll</h1>
        </div>
        <div class="item"><strong>Tutor Name:</strong> Oscar</div>
        <div class="item"><strong>Datum:</strong> ${data.datum}</div>
        <div class="item"><strong>Uhrzeit:</strong> ${data.time}</div>
        <div class="item"><strong>Student:</strong> ${data.student}</div>
        <div class="item"><strong>Thema der Sitzung:</strong> ${data.thema}</div>
    </div>
</body>
</html>`

    const browser = await puppeteer.launch({
        headless: 'new'
    });
    const page = await browser.newPage();

    await page.setContent(htmlContent);

    // 3. Použijete Puppeteer pro načtení HTML obsahu a konverzi do PDF
    const pdfBuffer = await page.pdf({ format: 'A4' });

    await browser.close();

    // Odeslání PDF klientovi
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=data.pdf');
    res.send(pdfBuffer);
} catch (e) {
    console.log(e);
    res.status(500).send('Chyba při generování PDF');


}}