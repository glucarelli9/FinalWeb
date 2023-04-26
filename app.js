const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const favicon = require("express-favicon");
const path = require("path");
const bodyParser = require("body-parser");

const PDF_FOLDER = "./pdfs";
const app = express();
var multer = require("multer");
var fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.set("recibos", path.join(__dirname, "recibos"));

//DESCARGA PDF
app.get("/recibos", (req, res) => {
  const pdfs = fs.readdirSync(PDF_FOLDER);

  const months = new Set([
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ]);
  const employees = new Set([]);

  pdfs.forEach((pdf) => {
    const [pdfMonth, pdfEmployee] = pdf.split("-");
    months.add(pdfMonth);
    employees.add(pdfEmployee);
  });
  res.render("recibos", {
    months: Array.from(months),
    employees: Array.from(employees),
  });
});

app.post("/download", (req, res) => {
  const requestedMonth = req.body.month;
  const requestedEmployee = req.body.employee;
  const pdfs = fs.readdirSync(PDF_FOLDER);

  const pdfsInMonth = pdfs.filter((pdf) => pdf.includes(requestedMonth));
  const pdfsForEmployee = pdfsInMonth.filter((pdf) =>
    pdf.includes(requestedEmployee)
  );

  if (pdfsForEmployee.length === 0) {
    return res
      .status(404)
      .send(
        "No se encontro el talon de pago del empleado y el mes solicitados.."
      );
  }

  const filePath = path.join(PDF_FOLDER, pdfsForEmployee[0]);
  res.download(filePath);
});
//SUBIDA DE ARCHIVOS

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    var dir =
      "/run/user/1000/gvfs/google-drive:host=castellanividrios.com.ar,user=servidor,prefix=%2F0AHIXV36Tp8nBUk9PVA%2F12P0YgLLtkeGbZiwMGIJfXr2C0lZFrB4D%2F1jD0RZTCCIZBK1X_mCAIbN9sTr7Z8k6wP/0AHIXV36Tp8nBUk9PVA/12P0YgLLtkeGbZiwMGIJfXr2C0lZFrB4D";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    callback(null, dir);
  },
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});
// ccccccc
var upload = multer({ storage: storage });
app.post(
  "/upload",
  upload.fields([
    { name: "dniFront", maxCount: 1 },
    { name: "dniBack", maxCount: 1 },
  ]),
  (req, res) => {
    const inputValue = req.body.inputValue;
    fs.rename(
      req.files.dniFront[0].path,
      "/run/user/1000/gvfs/google-drive:host=castellanividrios.com.ar,user=servidor/0AHIXV36Tp8nBUk9PVA/12P0YgLLtkeGbZiwMGIJfXr2C0lZFrB4D" +
        inputValue +
        ".jpg",
      (err) => {
        if (err) throw err;
      }
    );
    fs.rename(
      req.files.dniBack[0].path,
      "/run/user/1000/gvfs/google-drive:host=castellanividrios.com.ar,user=servidor/0AHIXV36Tp8nBUk9PVA/12P0YgLLtkeGbZiwMGIJfXr2C0lZFrB4D" +
        inputValue +
        ".jpg",
      (err) => {
        if (err) throw err;
      }
    );
    res.send("Archivos subidos exitosamente!");
  }
);

// Codigo funcional
// app.post('/upload', upload.array('dni', 2), (req, res) => {

//     req.files.forEach((file) => {
//         const inputValue = req.body.inputValue;
//       fs.rename(file.path, 'G:/Mi unidad/prueba/FrenteDNI-'+ inputValue + ".jpg", (err) => {
//         if (err) throw err;
//       });
//     });
//     res.send('Archivos subidos exitosamente!');
//   });
//fin subida de archivo

//Seteamos el motor de plantilla
app.set("view engine", "ejs");
app.set("recibos", path.join(__dirname, "recibos"));
app.get("/recibos", (req, res) => {
  const pdfs = fs.readdirSync(PDF_FOLDER);
  const months = new Set();

  pdfs.forEach((pdf) => {
    const pdfMonth = pdf.split("-")[0];
    months.add(pdfMonth);
  });

  res.render("recibos", { months: Array.from(months) });
});

//seteamos la carpeta public para archivos estaticos
app.use(express.static("public"));
app.get("/legajo", legajo);

// Para procesar datos enviados desde froms
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Funcion
function legajo(peticion, resultado) {
  resultado.sendFile(__dirname + "/public/html/legajo.html");
}

// function chat(peticion, chat) {
//     chat.sendFile(__dirname + "/public/html/chat.html")
// }

//Iniciamos Favicon
app.use(favicon(__dirname + "/public/img/favicon-16x16.png"));

//Seteamos las variables de entorno
dotenv.config({ path: "./env/.env" });

//Eliminar cache
app.use(function (req, res, next) {
  if (!req.user)
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  next();
});

//Llamar al router
app.use("/", require("./routes/router"));

const Servidor = app.listen(8090, () => {
  console.log("Server UP running in http://localhost:3000");
});

// Manejador de errores 404
app.use(function (req, res, next) {
  res.status(404).sendFile(path.join(__dirname, "public", "404.html"));
});

app.use(cookieParser());

app.get("/", (req, res) => {
  res.cookie("nombreCookie", "valorCookie", {
    sameSite: "None",
    secure: true,
  });
  res.send("Cookie enviada!");
});
