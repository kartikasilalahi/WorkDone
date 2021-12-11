const { mysql } = require('../connection')
var moment = require('moment')

const getUser = (id) => {
    // console.log("id", id)
    // console.log(`sql >> SELECT nama_depan, nama_belakang FROM user WHERE id=${id}`)
    let sql = `SELECT nama_depan, nama_belakang FROM user WHERE id=${id}`
    mysql.query(sql, (error, result) => {
        if (error) console.log("err", error)
        console.log("res", result[0])
        return result[0]
    })
}

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
            u.iddepartement,
            u.idlevel,
            r.role_name as role, 
            j.name as jabatan, 
            d.name as departemen 
            from user u JOIN role r ON u.idrole = r.id 
            JOIN jabatan j ON u.idjabatan=j.id 
            JOIN departemen d ON j.departemen_id=d.id 
            WHERE u.email='${email}' AND u.password = '${password}'`
            mysql.query(sql, (error, result) => {
                if (error) res.status(500).send({ error })

                if (result && result.length > 0) {
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
            r.role_name as role, 
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
        let { id } = req.query
        let sql = `SELECT 
        u.id, 
        u.nama_depan,
        u.nama_belakang, 
        u.email, 
        u.jk,
        u.tempat_lahir,
        u.tanggal_lahir,
        u.no_hp,
        u.alamat,
        u.status,
        u.idjabatan,
        u.iddepartement,
        u.tanggal_masuk,
        u.idlevel,
        r.role_name as role, 
        j.name as jabatan, 
        d.name as departemen,
        l.name as level
        from user u JOIN role r ON u.idrole = r.id 
        JOIN jabatan j ON u.idjabatan=j.id 
        JOIN departemen d ON j.departemen_id=d.id 
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
    // TOKEN
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
        let { id, keyword } = req.query
        let sql = `SELECT p.project_name, t.* 
        from task_user tu  JOIN task t ON tu.id =  t.id 
        JOIN project p ON p.id = t.project_id
        where tu.user_id = ${id} AND t.task_name LIKE '%${keyword}%'`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            res.send({
                status: 200,
                data: result
            })
        })
    },

    getDetailTask: (req, res) => {
        let { id } = req.params
        let sql = `SELECT p.project_name, t.* 
        from task_user tu  JOIN task t ON tu.id =  t.id 
        JOIN project p ON p.id = t.project_id
        where t.id=${id}`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            let sql = `SELECT nama_depan, nama_belakang FROM user WHERE id=${id}`
            mysql.query(sql, (error1, result1) => {
                if (error) console.log("err", error)
                return result[0]
            })

            let created_by = getUser(result[0].created_by)

            res.send({
                status: 200,
                data: result
            })
        })
    },
    getAllProjectUser: (req, res) => {
        let { id } = req.params
        let sql = `
        SELECT pu.id, 
        p.project_name, 
        u.nama_depan, 
        u.nama_belakang, 
        d.name as departemen 
        from project_user pu JOIN project p ON pu.project_id=p.id
        JOIN user u ON pu.user_id = u.id
        JOIN departemen d ON d.id=p.departemen_id WHERE user_id=${id}`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })
            res.send({
                status: 200,
                data: result
            })
        })
    },

    getAllProjectibyDepartemen: (req, res) => {
        let { iddepartemen } = req.params
        let sql = `
        SELECT *
        from project WHERE departemen_id=${iddepartemen}`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })
            res.send({
                status: 200,
                data: result
            })
        })
    },

    getDetailProject: (req, res) => {
        let { id } = req.params
        let sql = `
        SELECT * FROM workdone.project where id=${id};`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })
            res.send({
                status: 200,
                data: result
            })
        })
    },


    updateProgressTask: (req, res) => {
        const { id, new_progress } = req.body
        let isread = 1
        let isreadbyreviewer = 0;
        let last_update = moment().format("YYYY-MM-DD HH:mm:ss") // =>> UTK NGAMBIL TGL HARI INI
        let sql = `UPDATE task SET progress='${new_progress}', isread=${isread}, isreadbyreviewer=${isreadbyreviewer}, last_update='${last_update}' WHERE id=${id}`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })
            res.send({
                status: 200,
                message: `Status Task berhasil diperbaharui`
            })
        })
    },


    addNewTask: (req, res) => {
        // flow : tmabahkan ke tabel task dulu baru e task user
        let { assignee, created_by, start_datetime, end_datetime, level, description, task_name } = req.body
        let progress = 'TO DO'
        let created_on = moment().format("YYYY-MM-DD HH:mm:ss") // =>> UTK NGAMBIL TGL HARI INI
        let last_update = moment().format("YYYY-MM-DD HH:mm:ss") // =>> UTK NGAMBIL TGL HARI INI
        let sql = `INSERT INTO task SET ?`
        let dataTask = req.body
        dataTask.start_datetime = moment(start_datetime).format('YYYY-MM-DD HH:mm:ss')
        dataTask.end_datetime = moment(end_datetime).format('YYYY-MM-DD HH:mm:ss')
        dataTask.created_on = created_on
        dataTask.last_update = last_update
        dataTask.progress = progress
        dataTask.isread = 0;
        dataTask.isreadbyreviewer = 0;


        mysql.query(sql, dataTask, (err, result) => {
            if (err) return res.status(500).send(err)
            let dataTaskUser = {
                task_id: result.insertId,
                user_id: assignee
            }
            sql = `INSERT INTO task_user SET ?`
            mysql.query(sql, dataTaskUser, (err2, result2) => {
                if (err2) res.status(500).send(err2)

                res.send({
                    status: 200,
                    message: 'Task Baru berhasil ditambahkan!'
                })
            })
        })
    },




    getUserDepartemen: (req, res) => {
        let { id } = req.params
        let sql = `SELECT * FROM user WHERE iddepartement=${id}`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })
            res.send({
                status: 200,
                data: result
            })
        })
    },

    getNotif: (req, res) => {
        let { id } = req.params
        let isread = 0
        let sql = `SELECT p.project_name, t.* 
        from task_user tu  JOIN task t ON tu.id =  t.id 
        JOIN project p ON p.id = t.project_id
        where tu.user_id = ${id} AND t.isread=${isread}`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            res.send({
                status: 200,
                data: result
            })
        })
    },

    markReadTask: (req, res) => {
        const { id } = req.params
        let isread = 1;
        let sql = `UPDATE task SET isread=${isread} WHERE id=${id}`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })
            res.send({
                status: 200,
                message: `Task sudah dibaca`
            })
        })
    },

    updateTask: (req, res) => {
        let data = req.body
        let last_update = moment().format("YYYY-MM-DD HH:mm:ss") // =>> UTK NGAMBIL TGL HARI INI
        data.last_update = last_update

        let sql = `UPDATE task SET ? WHERE id=${data.id}`
        mysql.query(sql, data, (err, result) => {
            if (err) res.status(500).send({ error })

            res.send({
                status: 200,
                message: `Task berhasil diperbaharui`
            })
        })
    },


    sendReport: (req, res) => {

        let data = req.body
        let datetime = moment().format("YYYY-MM-DD HH:mm:ss")
        data.datetime = datetime

        let sql = `INSERT INTO report SET ?`;
        mysql.query(sql, data, (err, result) => {
            if (err) res.status(500).send(err)

            res.send({
                status: 200,
                message: 'Report berhasil dikirim!'
            })
        })
    },


    getAlltaskByReviewer: (req, res) => {
        let { id, keyword } = req.query
        let sql = `SELECT p.project_name, t.* 
        from task t JOIN project p ON p.id = t.project_id
        where t.reviewer = ${id} AND t.task_name LIKE '%${keyword}%'`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            res.send({
                status: 200,
                data: result
            })
        })
    },


    getNotifReviewer: (req, res) => {
        let { id } = req.params
        let isreadbyreviewer = 0
        let sql = `SELECT p.project_name, t.* 
        from task t JOIN project p ON p.id = t.project_id
        where t.reviewer = ${id} AND t.isreadbyreviewer=${isreadbyreviewer}`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            res.send({
                status: 200,
                data: result
            })
        })
    },

    markReadTaskByReviewer: (req, res) => {
        const { id } = req.params
        let isreadbyreviewer = 1;
        let isread = 0;
        let sql = `UPDATE task SET isreadbyreviewer=${isreadbyreviewer}, isread=${isread} WHERE id=${id}`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })
            res.send({
                status: 200,
                message: `Task sudah dibaca`
            })
        })
    },

    getAllProjectByDepartemen: (req, res) => {
        const { iddepartemen } = req.params;
        let sql = `SELECT * from project WHERE id_departemen=${iddepartemen}`;
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            res.send({
                status: 200,
                data: result
            })
        })
    },

    addNewProject: (req, res) => {
        // flow : tmabahkan ke tabel project dulu baru e project user (project_id dan user_id)
        let { project_name, list_user, project_description, departemen_id } = req.body
        let sql = `INSERT INTO project SET ?`
        let dataProject = {
            project_name,
            project_description,
            departemen_id
        }
        mysql.query(sql, dataProject, (err, result) => {
            if (err) return res.status(500).send(err)

            let listUser = []
            list_user.forEach((user, i) => {
                listUser.push([result.insertId, user.id])
            })
            sql = `INSERT INTO project_user (project_id, user_id) VALUES ?`
            mysql.query(sql, [listUser], (err2, result2) => {
                if (err2) res.status(500).send(err2)

                res.send({
                    status: 200,
                    message: 'Task Baru berhasil ditambahkan!'
                })
            })
        })

    },

    getAllUser: (req, res) => {
        let { keyword } = req.query

        let sql = `SELECT u.id, 
        u.nama_depan,
        u.nama_belakang, 
        u.email, 
        u.jk,
        u.tempat_lahir,
        u.tanggal_lahir,
        u.no_hp,
        u.alamat,
        u.tanggal_masuk,
        u.idlevel,
        u.status,
        r.role_name as role, 
        j.name as jabatan, 
        d.name as departemen,
        l.name as level
        from user u JOIN role r ON u.idrole = r.id 
        JOIN jabatan j ON u.idjabatan=j.id 
        JOIN departemen d on u.iddepartement = d.id 
        JOIN level l ON l.id=u.idlevel
        WHERE u.nama_depan LIKE '%${keyword}%' OR u.nama_belakang LIKE '%${keyword}%'`;
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            res.send({
                status: 200,
                data: result
            })
        })
    },

    getAllDepartemen: (req, res) => {
        let { keyword } = req.query
        let sql = `SELECT d.*, u.email, u.nama_depan, u.nama_belakang 
        from departemen d JOIN user u ON d.idatasan=u.id
        WHERE d.name LIKE '%${keyword}%'`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            res.send({
                status: 200,
                data: result
            })
        })

    },

    addNewDepartment: (req, res) => {
        let data = req.body
        let sql = `INSERT INTO departemen SET ?`
        mysql.query(sql, data, (err, result) => {
            if (err) return res.status(500).send(err)

            res.send({
                status: 200,
                message: 'Department Baru berhasil ditambahkan!'
            })
        })
    },

    editDepartemen: (req, res) => {
        let data = req.body
        let sql = `UPDATE departemen SET ? WHERE id=${data.id}`
        mysql.query(sql, data, (err, result) => {
            if (err) res.status(500).send({ error })

            res.send({
                status: 200,
                message: `Departemen berhasil diperbaharui`
            })
        })
    },


    getAllTask: (req, res) => {
        let { keyword } = req.query
        let sql = `SELECT p.project_name, t.* 
        from task_user tu  JOIN task t ON tu.id =  t.id 
        JOIN project p ON p.id = t.project_id
        where t.task_name LIKE '%${keyword}%'`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            res.send({
                status: 200,
                data: result
            })
        })
    },


    getAllProject: (req, res) => {
        let { keyword } = req.query
        let sql = `SELECT p.*, d.name as departemen from project p
        JOIN departemen d on p.departemen_id = d.id
        where p.project_name LIKE '%${keyword}%'`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            res.send({
                status: 200,
                data: result
            })
        })
    },

    getListJabatanbyDepartemen: (req, res) => {
        let { id } = req.query
        let sql = `SELECT * from jabatan where departemen_id=${id}`
        mysql.query(sql, (error, result) => {
            if (error) res.status(500).send({ error })

            res.send({
                status: 200,
                data: result
            })
        })
    },

    addNewUser: (req, res) => {
        let data = req.body
        data.tanggal_masuk = moment(req.body.tanggal_masuk).format('YYYY-MM-DD HH:mm:ss')
        data.tanggal_lahir = moment(req.body.tanggal_lahir).format('YYYY-MM-DD HH:mm:ss')
        data.idrole = 2

        let sql = `INSERT INTO user SET ?`
        mysql.query(sql, data, (err, result) => {
            if (err) return res.status(500).send(err)

            res.send({
                status: 200,
                message: 'User Baru berhasil ditambahkan!'
            })
        })
    },

    // `project_name`, `departemen_id`, `project_description`

    // integrate algo in all task user (PENDING)
    // create task by reviewer (DONE)
    // add project (DONE)
    // VIEW detail project (NOT YET)
    // edit progress on page task by REVIEWER nedd to fixing
    // edit project
    // registrasi user
    // fitur admin :
    // (table departemen and search departemen (DONE), add new department (DONE), edit department (DONE))
    // (table task and search task (DONE), detail task (not yet))
    // (table project and search project (DONE), detail project (not yet))
    // (table user and search user (DONE), add new user (DONE), edit user (not yet), detail user (DONE))
    // profil (not yet)
    // change report on reviewer (view report per user => NOT YET)
    // change password (not yet)
    // LIVE ATTENDANCE (not yet)
    // validate if form empty when submit (not yet)
    // SUSUN LAPORAN 
    // GASSSSSSSSSSSSSSSSSSSSSSSS
    // DETAIL TASK for user (assignee, reviewer, created by with name npot id_)

    // Tes New Project

    // ini tes new project, dubat hari ininih, semoga berhasil ya!!!!



    // anggota:

    // kartika as front end developer

    // dian as ui/ux designer

    // alfan as QA tester

    // cris as back end developer





}