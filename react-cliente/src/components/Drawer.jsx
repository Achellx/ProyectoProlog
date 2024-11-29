import React from "react";
import "../styles/Drawer.css";

const Drawer = ({
  valor, 
  setValor,
  handleInsertar,
  handleEliminar,
  handleCambiar,
  handleMostrar,
  handleVaciar,
  mensaje
}) => {
  return (
    <div className="drawer">
      <div className="drawer-header">
        <h2>ABB Máximo</h2>
      </div>
      <nav className="drawer-nav">
        <div className="drawer-item">
          <input
            type="number"
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            placeholder="Insertar valor"
          />
        </div>
        <div className="drawer-item">
          <button onClick={handleInsertar}>Insertar</button>
        </div>
        <div className="drawer-item">
          <button onClick={handleEliminar}>Eliminar</button>
        </div>
        <div className="drawer-item">
          <button onClick={handleCambiar}>Actualizar</button>
        </div>
        <div className="drawer-item">
          <button onClick={handleMostrar}>Visualizar</button>
        </div>
        <div className="drawer-item">
          <button onClick={handleVaciar}>Vaciar nodo</button>
        </div>
      </nav>
    </div>
  );
};

export default Drawer;
