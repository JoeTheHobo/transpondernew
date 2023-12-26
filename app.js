//In Terminal
// ctrl C - Quit Server
// node app.js - Start Server

const express = require("express");
const {google} = require('googleapis');

const app = express();

app.use(express.static('../transponders-main'))

app.get('/info', async (req,res) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const client = await auth.getClient();

    const googleSheets = google.sheets({version: "v4",auth: client})

    const spreadsheetId = '1qLaORB_pafdze3g57NEQXj0k8dK3X6JQt2nC2oIi5HM';

    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet2",
    })

    res.status(200).json({info: getRows.data})
    
})

app.listen(3000, (req,res) => {
    console.log('We Hear you at 3000')
})

