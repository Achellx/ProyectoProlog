import React, { useState, useEffect } from "react";
import Tree from "react-d3-tree";
import "./App.css";
import Drawer from "./components/Drawer";
import { insertarValor, eliminarValor, actualizarValor, obtenerValores, vaciarArbol } from './services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [valor, setValor] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [arbol, setArbol] = useState([]);

  const handleInsertar = async () => {
    const data = await insertarValor(valor);
    setMensaje(data.mensaje);
    setArbol(data.arbol);
    toast.success(data.mensaje);
  };

  const handleEliminar = async () => {
    const data = await eliminarValor(valor);
    setMensaje(data.mensaje);
    setArbol(data.arbol);
    toast.sucess(data.mensaje);
  };

  const handleCambiar = async () => {
    const nuevoValor = prompt("Ingrese el nuevo valor");
    const data = await actualizarValor(valor, nuevoValor);
    setMensaje(data.mensaje);
    setArbol(data.arbol);
    toast.success(data.mensaje);
  };

  const handleMostrar = async () => {
    const data = await obtenerValores();
    setArbol(data.arbol);
  };

  const handleVaciar = async () => {
    const data = await vaciarArbol();
    setMensaje(data.mensaje);
    setArbol([]);
    toast.success(data.mensaje);
  };

  // Convertir el árbol a un formato compatible con react-d3-tree
  const convertToTree = (node) => {
    if (!node || node.length === 0) return { name: "empty" }; // Manejar nodos vacíos
    const [value, left, right] = node;
    return {
      name: value.toString(),
      children: [convertToTree(left), convertToTree(right)],
    };
  };

  const treeData = convertToTree(arbol);

  return (
    <>
      <div className="App" style={{display:"flex"}}>
        {/* <h1>Árbol Binario de Búsqueda Máximo</h1>
      <input
        type="text"
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        placeholder="Ingrese un valor"
      />
      <button onClick={handleInsertar}>Insertar</button>
      <button onClick={handleEliminar}>Eliminar</button>
      <button onClick={handleCambiar}>Cambiar</button>
      <button onClick={handleMostrar}>Mostrar</button>
      <button onClick={handleVaciar}>Vaciar</button>
      <p>{mensaje}</p> */}
        <ToastContainer />
        <Drawer 
          valor={valor}
          setValor={setValor}
          handleInsertar={handleInsertar}
          handleEliminar={handleEliminar}
          handleCambiar={handleCambiar}
          handleMostrar={handleMostrar}
          handleVaciar={handleVaciar}
          mensaje={mensaje}
        />
        <div id="treeWrapper">
          {treeData && (
            <Tree
              data={treeData}
              enableLegacyTransitions={true}
              orientation="vertical"
              rootNodeClassName="node__root"
              branchNodeClassName="node__branch"
              leafNodeClassName="node__leaf"
              separation={{ siblings: 2, nonSiblings: 2 }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default App;
