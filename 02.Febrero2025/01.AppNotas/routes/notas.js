import express from 'express'
import fs from 'fs'
import path, { parse } from 'path'
import { fileURLToPath } from 'url'

const router = express.Router()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const notasFilePath = path.join(__dirname, "../data/notas.json")


// Leer notas desde el archivos
const leerNotas = () => {
    return fs.existsSync(notasFilePath)
        ? JSON.parse(fs.readFileSync(notasFilePath, "utf-8"))
        :[]
}

// Guardar notas en el archivo
const guardarNotas = (notas) => {
    fs.writeFileSync(notasFilePath, JSON.stringify(notas, null, 2))
}


// ********************** RUTASSS ********************** 

//Obtener todas las notas
router.get('/', (req, res) => {
    res.json(leerNotas())
})

//Agregar una nueva nota
router.post('/', (req, res) =>{
    const notas = leerNotas()

    const nuevaNota ={
        id: notas.length > 0 ? notas[notas.length - 1].id + 1 : 1,
        titulo: req.body.titulo,
        contenido: req.body.contenido
    }

    notas.push(nuevaNota)
    guardarNotas(notas)
    res.json(nuevaNota)

})

//Editar una nota que existe
router.put('/:id', (req, res) =>{

    const notas = leerNotas()
    const id = parseInt(req.params.id)
    const index = notas.findIndex(n => n.id === id)

    if(index !== -1){
        notas[index].titulo = req.body.titulo
        notas[index].contenido = req.body.contenido

        guardarNotas(notas)
        res.json(notas[index])

    }else{
        res.status(404).json({message: "Nota no encontrada"})
    }

})


//Eliminar una nota
router.delete('/:id', (req, res) => {

    let notas = leerNotas()
    const id  = parseInt(req.params.id)
    notas = notas.filter(nota => nota.id !== id)
    guardarNotas(notas)
    res.json({message: "Nota elminada"})
})



export default router;
