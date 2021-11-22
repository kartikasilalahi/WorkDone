const express = require('express')
const { taskmanController } = require('../controller')

const router = express.Router()

router.get('/login', taskmanController.login)
router.get('/login/:id', taskmanController.login)
router.get('/profile/:id', taskmanController.getProfil)
router.get('/role', taskmanController.getListRole)
router.get('/departemen', taskmanController.getListDepartemen)
router.get('/jabatan', taskmanController.getListJabatan)
router.get('/alltaskuser', taskmanController.getAllTaskUser)
router.get('/detailtask/:id', taskmanController.getDetailTask)
router.get('/allprojectuser/:id', taskmanController.getAllProjectUser)
router.get('/detailproject/:id', taskmanController.getDetailProject)
router.get('/getuserdepartemen/:id', taskmanController.getUserDepartemen)
router.get('/getnotif/:id', taskmanController.getNotif)

router.put('/ubahpassword/:id', taskmanController.ubahPasword)

router.post('/register', taskmanController.register)
router.post('/updateprogress', taskmanController.updateProgressTask)
router.post('/addnewtask', taskmanController.addNewTask)
router.post('/markreadtask/:id', taskmanController.markReadTask)
router.post('/updatetask', taskmanController.updateTask)
router.post('/sendreport', taskmanController.sendReport)




module.exports = router