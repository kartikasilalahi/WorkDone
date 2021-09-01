const { mysql } = require('../connection')

module.exports = {
    login: (req, res) => {
        const { email, password } = req.query
        var sql = `Select id, email, fullname, idjabatan, idrole, iddepartemen from user where email='${email}' and password = '${password}' `
        mysql.query(sql, (error, result) => {
            if (err) res.status(500).send({ err })

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
    }
}