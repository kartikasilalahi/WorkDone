const express = require('express')
const { authController } = require('../controller')

const router = express.Router()

router.get('/login', authController.login)
router.get('/login/:id', authController.login)
router.get('/profile/:id', authController.getProfil)
router.get('/role', authController.getListRole)
router.get('/departemen', authController.getListDepartemen)
router.get('/jabatan', authController.getListJabatan)
router.get('/alltaskuser/:id', authController.getAllTaskUser)
router.get('/detailtask/:id', authController.getDetailTask)

router.put('/ubahpassword/:id', authController.ubahPasword)
router.put('/ubahpassword/:id', authController.ubahPasword)

router.post('/register', authController.register)



module.exports = router