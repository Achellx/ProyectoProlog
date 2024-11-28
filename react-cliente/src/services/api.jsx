const API_URL = "/api";

// funcion para insertar el valor
export const insertarValor = async (valor) => {
    const response = await fetch(`${API_URL}/insertar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ valor: Number(valor) }),
    });
    const data = await response.json();
    return data;
};

// funcion para eliminar el valor
export const eliminarValor = async (valor) => {
    const response = await fetch(`${API_URL}/eliminar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ valor: Number(valor) }),
    });
    const data = await response.json();
    return data;
};

// funcion para cambiar el valor
export const actualizarValor = async (valorActual, nuevoValor) => {
    const response = await fetch(`${API_URL}/cambiar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
            valor_actual: Number(valorActual),
            nuevo_valor: Number(nuevoValor),
         }),
    });
    const data = await response.json();
    return data;
};

export const obtenerValores = async () => {
    const response = await fetch(`${API_URL}/mostrar`);
    const data = await response.json();
    return data;
};

export const vaciarArbol = async () => {
    const response = await fetch(`${API_URL}/vaciar`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({}),
    });
    const data = await response.json();
    return data;
}
