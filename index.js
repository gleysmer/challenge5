
const express = require('express')
const mysql = require('mysql')

const app = express()

app.use(express.json())

const conectBD = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'vehiculo'
})


app.get('/', (req,res) => {
    res.send('Welcome to the cars')
})

// Api to get all products 
app.get('/carros', (req, res) => {
        const sql = 'SELECT * FROM carro'

        conectBD.query(sql, (error, result) => {
            if (error) throw error;

            if (result.length > 0) {
                res.json(result)
            } else {
                res.send('Not results')
            }
        })
})


app.get('/carro/:id', (req, res) => {
    const id = req.params.id

    const sql = `SELECT * FROM carro WHERE id_carro = ${id}`

    conectBD.query(sql, (error, result) => {
        if (error) throw error

        if ( result.length > 0) {
            res.json(result)
        } else {
            res.send('Not result')
        }
    })
})


app.post('/addcarro', (req, res) => {
    const sql = 'INSERT INTO carro SET ?'

    const insertar = {
        
        nombre: req.body.nombre,
        año_fabricacion: req.body.año_fabricacion,
        costo: req.body.costo,
        cantidad: req.body.cantidad
    }

    conectBD.query(sql, insertar, error => {
        if (error) throw error

        res.send('carro added')
    })
})


app.put('/updatecarro/:id', (req, res) => {
    const id = req.params.id
    const { nombre,  costo, cantidad} = req.body
    
    if ((nombre && costo) === undefined){
        const sql = `UPDATE carro SET
            cantidad = '${cantidad === undefined ? '' : cantidad}'
            WHERE id_carro = ${id}`

            conectBD.query(sql, error => {
                if (error) throw error
        
                res.send('carro updated')
            })
            return
    } else {
        const sql = `UPDATE carro SET nombre= '${nombre}', 
            cantidad = '${cantidad}', 
            costo= '${costo}'
            WHERE id_carro = ${id}`

        conectBD.query(sql, error => {
        if (error) throw error

        res.send('carro updated')
    })
    }
})


app.delete('/deletecarro/:id', (req,res) => {
    const id = req.params.id
    const sql = `DELETE FROM carro WHERE id_carro = ${id}`

    conectBD.query(sql, error => {
        if (error) throw error

        res.send('carro deleted')
    })
})


app.listen(4000,() => {
    console.log('server running in port 4000')
})