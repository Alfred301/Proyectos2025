const notaForm = document.getElementById("notaForm")
const notasContainer = document.getElementById("notasContainer")
const tituloInput = document.getElementById("titulo")
const contenidoInput = document.getElementById("contenido")
let notaEditando = null

//Obtener notas desde el servidor
const obtenerNotas = async () =>{
    const res = await fetch("api/notas")
    const notas = await res.json()

    notasContainer.innerHTML = ""

    notas.forEach(nota => {
        const notaDiv = document.createElement("div")
        notaDiv.classList.add("nota")
        notaDiv.innerHTML = `
            <h3>${nota.titulo}</h3>
            <p>${nota.contenido}</p>
            <button onclick="editarNota(${nota.id}, '${nota.titulo}', '${nota.contenido}')">Editar</button>
            <button onclick="eliminarNota(${nota.id})">Eliminar</button>
        `
        notasContainer.appendChild(notaDiv)

    })
}

//Agregar o actualizar una nota
notaForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const titulo = tituloInput.value
    const contenido = contenidoInput.value
    
    if(notaEditando){
        await fetch(`/api/notas/${notaEditando}`, {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({titulo, contenido})
        })
        notaEditando=null
    }else{
        await fetch("api/notas", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({titulo, contenido})
        })
    }

    notaForm.reset()
    obtenerNotas()
})


//Editar una nota
const editarNota = (id, titulo, contenido) => {
    tituloInput.value = titulo
    contenidoInput.value = contenido
    notaEditando = id
}


//Eliminar una nota
const eliminarNota = async (id) => {
    await fetch(`/api/notas/${id}`, {
        method: "DELETE"
    })
    obtenerNotas()
}

//Cargar notas al inicio
obtenerNotas()
