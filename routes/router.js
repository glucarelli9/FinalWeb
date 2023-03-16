const { application } = require('express')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const authController = require('../controllers/authController')


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

router.use(multer().single('photos'))

// router.get('/reparacion',authController.isAuthenticated,(req,res)=>{
//     res.render('reparacion',{user:req.user})
// })
//rutas para los metodos controller
 router.post('/register',authController.register)
 module.exports = router

 router.post('/login',authController.login)
 module.exports = router

 router.get('/logout',authController.logout)
 module.exports = router

 