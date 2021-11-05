const { mysql } = require('../connection')

module.exports = {

    register: (req, res) => {
        const { email, fullname, idjabatan, idrole, iddepartemen, password } = req.body

        let sql = `SELECT * FROM user where email=${email}`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            if (result.length > 0) {
                return res.status(200).send({ message: 'Email Sudah Terdaftar' })
            } else {
                let dataRegister = {
                    email,
                    fullname,
                    idjabatan,
                    idrole,
                    iddepartemen,
                    password
                }
                sql = `INSERT INTO user SET ?`
                mysql.query(sql, (error2, result2) => {
                    if (error2) return res.status(500).send({ error2 })

                    return res.status(200).send({ message: 'Berhasil Registrasi Akun' })
                })
            }
        })
    },

    login: (req, res) => {
        const { email, password } = req.query
        let { id } = req.params
        if (email && password) {
            let sql = `SELECT 
            u.id, 
            u.nama_depan,
            u.nama_belakang, 
            u.email, 
            r.role_name as role, 
            j.name as jabatan, 
            d.name as departemen 
            from user u JOIN role r ON u.idrole = r.id 
            JOIN jabatan j ON u.idjabatan=j.id 
            JOIN departemen d ON j.departemen_id=d.id 
            WHERE u.email='${email}' AND u.password = '${password}'`
            console.log("sql", sql)
            mysql.query(sql, (error, result) => {
                if (error) res.status(500).send({ error })
                console.log("masuk, ", result)

                if (result && result.length > 0) {
                    console.log('result', result)
                    res.send({
                        status: 200,
                        data: result
                    })
                } else {
                    res.status(200).send({ message: "username or password is incorrect" })
                }
            })
        } else if (id) {
            let sql = `SELECT 
            u.id, 
            u.nama_depan,
            u.nama_belakang, 
            u.email, 
            r.name as role, 
            j.name as jabatan, 
            d.name as departemen 
            from user u JOIN role r ON u.idrole = r.id 
            JOIN jabatan j ON u.idjabatan=j.id 
            JOIN departemen d ON j.iddepartemen=d.id `
            mysql.query(sql, (error, result) => {
                if (error) res.status(500).send({ error })

                res.send({
                    status: 200,
                    data: result
                })

            })
        }
    },

    getProfil: (req, res) => {
        let { id } = req.params
        let sql = `SELECT 
        u.id, 
        u.nama_depan,
        u.nama_belakang, 
        u.email, 
        r.name as role, 
        j.name as jabatan, 
        d.name as departemen 
        l.name as level
        from user u JOIN role r ON u.idrole = r.id 
        JOIN jabatan j ON u.idjabatan=j.id 
        JOIN departemen d ON j.iddepartemen=d.id 
        JOIN level l ON l.id=u.idlevel
        WHERE u.id=${id}`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            res.send({
                status: 200,
                data: result
            })
        })
    },

    ubahPasword: (req, res) => {
        let { id } = req.params
        let { password, newpassword } = req.body
        let sql = `SELECT * FROM user where id=${id}`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            if (password !== result[0].password) {
                return res.status(200).send({ message: "Password tidak sesuai" })
            } else {
                sql = `UPDATE user SET password=${newpassword} WHERE is=${id}`
                mysql.query(sql, (error2, result2) => {
                    if (error2) return res.status(500).send({ error2 })

                    return res.status(200).send({ message: "Password berhasil diubah" })
                })
            }
        })
    },


    getListJabatan: (req, res) => {
        let sql = `SELECT * from jabatan`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            res.send({
                status: 200,
                data: result
            })
        })
    },
    // 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
    getListDepartemen: (req, res) => {
        let sql = `SELECT * from departemen`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            res.send({
                status: 200,
                data: result
            })
        })
    },

    getListRole: (req, res) => {
        let sql = `SELECT * from role`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            res.send({
                status: 200,
                data: result
            })
        })
    },
    // JOIN project p ON p.id = t.project_id 
    getAllTaskUser: (req, res) => {
        let { id } = req.params
        let sql = `SELECT p.project_name, t.* 
        from task_user tu  JOIN task t ON tu.id =  t.id 
        JOIN project p ON p.id = t.project_id
        where tu.user_id = ${id}`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            res.send({
                status: 200,
                data: result
            })
        })
    },

    getAllProjectUser: (req, res) => {
        let { id } = req.params
        let sql = `SELECT p.project_name, p.departemen_id from project_user pu JOIN project p ON pu.project_id = p.id where pu.user_id = ${id}`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })



            res.send({
                status: 200,
                data: result
            })
        })
    },

}