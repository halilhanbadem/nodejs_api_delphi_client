const express = require("express");
const api = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
var mysql = require("mysql");


var con = mysql.createConnection({
    host: "localhost",
    user: "username",
    password: "pass",
    database: "database",
    port: 3306
});

con.connect(function(err) {
    if (err) throw err;
})




api.use(bodyParser.urlencoded({ extended: true }));
api.use(bodyParser.json());
api.use((req, res, next) => {
  console.log(`${req.ip} IP adresi istek attı...`);
  next();
});



api.get("", (req, res, next) => {
   		res.send("Oooo hoşgeldiniz. <br> Şurayı ziyaret ediniz: <a href='https://github.com/halilhanbadem/nodejs_api_delphi_client' target='_blank'>nodejs_api_delphi_client Github</a>");
	});

api.get("/api/lisans/", (req, res, next) => {
	res.send("Buraya post göndermeniz gerekir.");
});

api.get("*", (req, res, next) => {
	res.status(404).send("Bu URI yok efenim.");
  });



api.post("/api/lisans/", (req, res, next) => {
    var sql = 'SELECT count(*) as kayit FROM lisanslar where lisans_no = ?';
    con.query(sql, [req.body.lisansno] , function (err, result, fields) {
    if (result[0].kayit <= 0)
    {
        res.send({
            message: `${req.body.name || "-"} numaralı bir lisans bulunamadı.`
        });
    } else 
    {
        var sql = 'select * from lisanslar where lisans_no = ?';
        con.query(sql, [req.body.lisansno], function(err, result, fields) {
            res.send({
                lisans_sahibi: result[0].adi,
                lisans_no: result[0].lisans_no,
                bitis_tarihi: result[0].bitis_tarihi,
                baslangic_tarihi: result[0].baslangic_tarihi
            });   
        });   
    }       
    });
   
});


api.listen(port, () => {
  console.log("Sunucu başlatıldı.");
});

