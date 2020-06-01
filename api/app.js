const express = require('express')
    , path = require('path')
    , app = express()
    , multer = require('multer')
    , mysql = require('mysql')
    , bodyParser = require("body-parser")
    , fs = require('fs')
    , cors = require('cors')
    , csv = require('fast-csv')
    , utils = require('./utils');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'test'
});

const DIR = './uploads';

connection.connect();

global.db = connection;

let storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, DIR);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

let upload = multer({storage: storage});

const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.listen(PORT, function () {
    console.log('Node.js server is running on port ' + PORT);
});

app.post('/api/v1/upload', upload.single('csv'), function (req, res) {
    console.log('upload: ------: ', req.file)
    let query = 'INSERT INTO `invoice`(`invoice_id`, `amount`, `due_on`, `sell_price`) VALUES ';
    let sellPrice;
    let rowIndex = 1;
    let errors = '';
    let rowError = '';

    fs.createReadStream(path.resolve(__dirname, req.file.path))
        .pipe(csv.parse({headers: false}))
        .on('error', error => {
            console.error(error);
        })
        .on('data', row => {
            rowError = utils.validateInvoiceRow(row, rowIndex);

            if (rowError) {
                errors += rowError;

            } else {
                sellPrice = utils.calcSellPrice(row[1], row[2]);
                query += "('" + row[0] + "', '" + row[1] + "', '" + row[2] + "', '" + sellPrice + "'), "
            }

            rowIndex++;
        })

        .on('end', rowCount => {
            db.query(query.slice(0, -2), function (err, result) {
                console.log(err);
                console.log(result);
            });

            res.json({errors});
        });
});

app.get('/api/v1/invoices', function (req, res) {
    const query = 'SELECT * FROM `invoice`';

    db.query(query, function (err, result) {
        console.log(err);
        console.log(result);

        res.json(result);
    });
});
