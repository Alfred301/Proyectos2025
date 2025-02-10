import express from "express"
import cors from "cors"
import notasRoutes from "./routes/notas.js"
import path from 'path'
import { fileURLToPath } from "url"

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use(cors())
app.use(express.json())
app.use('/api/notas', notasRoutes)
app.use(express.static(path.join(__dirname, "public")))


const PORT = 3000

app.listen(PORT, () =>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
})