const express = require('express')
const cors = require('cors')
const connectDB = require('./db')
const leadRoutes = require('./routes/lead.routes')

const app = express()
app.use(cors({ origin: true }))
app.use(express.json())
require('dotenv').config()

const PORT = process.env.PORT || 8000

app.use('/api/v1/leads', leadRoutes)

connectDB(process.env.MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected')
        app.listen(PORT, () => console.log(`Server running on ${PORT}`))
    })
    .catch(err => {
        console.error('DB connection error:', err)
        process.exit(1)
    })