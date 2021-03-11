const express = require("express")
const path = require('path');
const config = require('config')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || config.get('port');

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(process.cwd(), 'client/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(process.cwd(), 'client/build/index.html'))
    })
}

app.use(express.json({extended: true}))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/shedule', require('./routes/shedule.routes'))

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'),{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        app.listen(port, () => {
            console.log(`server started on port ${port}`)
        })
    } catch (e) {
        console.log(e.message)
        process.exit(1)
    }
}

start()