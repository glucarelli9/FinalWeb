
const express = require('express')
const nodemailer = require('nodemailer')
const router = express.Router()
const authController = require('../controllers/authController')
const fs = require('fs')
const Swal = require('sweetalert2');



router.get('/trabaja',(req,res)=>{
    res.render('trabaja',{alert:false})
})

//Rutas para las vistas
router.get('/panel',authController.isAuthenticated,(req,res)=>{
    res.render('panel', {user:req.user})
})


//Abajo va estp ,authController.isAuthenticated, y index 1 no dos
router.get('/',(req,res)=>{
    
    res.render('index',{alert:false})
    

 })
router.get('/login',(req,res)=>{
    res.render('login', {alert:false})
})
router.get('/register',(req,res)=>{
    res.render('register', {alert:false})
})
router.get('/recibos',authController.isAuthenticated,(req,res)=>{
    res.render('recibos',{user:req.user})
})
router.get('/subir_doc',authController.isAuthenticated,(req,res)=>{
    res.render('subir_doc',{user:req.user})
})
router.get('/contacto',(req,res)=>{
    res.render('contacto',{alert:false})
})
router.get('/chat',(req,res)=>{
    res.render('chat',{alert:false})
})
router.get('/vidrios',(req,res)=>{
    res.render('vidrios',{alert:false})
})
router.get('/Aluminio',(req,res)=>{
    res.render('Aluminio',{alert:false})
})
router.get('/dvh',(req,res)=>{
    res.render('dvh',{alert:false})
})
router.get('/pvc',(req,res)=>{
    res.render('pvc',{alert:false})
})
// RENDERIZAMOS LEGAJO

// router.use(multer().single('photos'))

router.get('/reparacion',(req,res)=>{
 res.render('reparacion',{alert:false})
})


//rutas para los metodos controller
 router.post('/register',authController.register)
 module.exports = router

 router.post('/login',authController.login)
 module.exports = router

 router.get('/logout',authController.logout)
 module.exports = router

 const multer = require('multer');
 const storage = multer.diskStorage({
     destination: function (req, file, cb) {
         cb(null, './temp');
     },
     filename: function (req, file, cb) {
         cb(null, file.originalname);
     }
 });
 const upload = multer({ storage: storage });
 


//  Mailer:
router.post('/send-email', upload.single('archivoAdjunto'),async (req,res)=>{
    const {nombre,email,telefono,dvh,perfileria,urgencia,estado,message} = req.body;
    let attachment = null;
    if (req.file) {
        attachment = {
            filename: req.file.originalname,
            path: req.file.path
        }
    }
    contentHTML = `
        <h2>Informacion de Contacto:</h2>
        <ul>
            <li> Nombre: ${nombre}</li>
            <li> Email: ${email}</li>
            <li> Telefono: ${telefono}</li>
            <li> Es con DVH: ${dvh}</li>
            <li> Perfileria: ${perfileria}</li>
            <li> Urgencia de la Obra: ${urgencia}</li>
            <li> Estado del Proyecto: ${estado}</li>
        </ul>

    
        <h3>Mensaje:</h3>
        <p><h4>${message}</h4></p>
    `;


    const transporter = nodemailer.createTransport({
        host:'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: 'servicio.envio.castellani@gmail.com',
            pass: 'pchzpknjukwoazeh' //pchzpknjukwoazeh

        },
        tls:{
            rejectUnauthorized: false
        }
    });
    const info = await transporter.sendMail({
        form: "'GmailServer' <servicio.envio.castellani@gmail.com>",
        to: 'analia.tumini@castellanividrios.com.ar,guadalupe.sanjuan@castellanividrios.com.ar,tomas.lavin@castellanividrios.com.ar,gabriel.madrid@castellanividrios.com.ar',
        subject: 'Pagina Web Castellani Presupuesto',
        html: contentHTML,
        attachments: attachment ? [attachment] : []
    });
   


  // Redirigir a la página de contacto
  res.redirect('/contacto');
  res.cookie('nombreCookie', 'valorCookie', {
    sameSite: 'None',
    secure: true
  });
    
});
