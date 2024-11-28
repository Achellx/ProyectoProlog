import React, {useState} from 'react'
import { insertarValor, eliminarValor, actualizarValor, obtenerValores, vaciarArbol } from './services/api'
import './App.css'

const App = () => {
  const [valor, setValor] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [arbol, setArbol] = useState([])

  const handleInsertar = async () => {
    const data = await insertarValor(valor)
    setMensaje(data.mensaje)
    setValor(data.arbol)
  }

  const handleEliminar = async () => {
    const data = await eliminarValor(valor)
    setMensaje(data.mensaje)
    setValor(data.arbol)
  }

  const handleCambiar = async () => {
    const nuevoValor = prompt('Ingrese el nuevo valor')
    const data = await actualizarValor(valor, nuevoValor)
    setMensaje(data.mensaje)
    setValor(data.arbol)
  }

  const handleMostrar = async () => {
    const data = await obtenerValores()
    setArbol(data.arbol)
  }

  const handleVaciar = async () => {
    const data = await vaciarArbol()
    setMensaje(data.mensaje)
    setArbol([])
  }

  return(
    <div>
      <h1>ABB Máximo</h1>
      <input
        type="number"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Ingrese un valor"
      />
      <button onClick={handleInsertar}>Insertar</button>
      <button onClick={handleEliminar}>Eliminar</button>
      <button onClick={handleCambiar}>Cambiar</button>
      <button onClick={handleMostrar}>Mostrar</button>
      <button onClick={handleVaciar}>Vaciar</button>

      <p>{mensaje}</p>
      <pre>{JSON.stringify(arbol, null, 2)}</pre>
    </div>
  )

}

export default App
