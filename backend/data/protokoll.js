export let htmlContent = `
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
</html>
`;

