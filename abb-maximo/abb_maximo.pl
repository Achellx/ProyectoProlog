% Crear Arbol vacio
crear_abb(vacio).

% Insertar un valor en el arbol
insertar(Valor, vacio, nodo(Valor, vacio, vacio)). % Se inserta el valor en un arbol vacio

insertar(Valor, nodo(Raiz, Izq, Der), nodo(Valor, nodo(Raiz, Izq, Der), vacio)) :- Valor > Raiz, !. % Si el valor es mayor, se convierte en la nueva raiz

insertar(Valor, nodo(Raiz, Izq, Der), nodo(Raiz, NuevoIzq, Der)) :-
    Valor =< Raiz, % El valor que sea menor o igual se inserta en el subarbol izquierdo
    insertar(Valor, Izq, NuevoIzq).

eliminar(Valor, nodo(Valor, vacio, vacio), vacio).

eliminar(Valor, nodo(Valor, Izq, vacio), Izq). % Nodo con un hijo izquierdo
eliminar(Valor, nodo(Valor, vacio, Der), Der). % Nodo con un hijo derecho

eliminar(Valor, nodo(Valor, Izq, Der), nodo(Predecesor, NuevoIzq,Der)) :- 
    obtener_maximo(Izq, Predecesor), % Obtiene el valor mayor del subarbol izquierdo
    eliminar(Predecesor, Izq, NuevoIzq).

eliminar(Valor, nodo(Raiz, Izq, Der), nodo(Raiz, NuevoIzq, Der)) :-
    Valor < Raiz, % Si el valor es menor, se elimina el subarbol izquierdo
    eliminar(Valor, Izq, NuevoIzq).

eliminar(Valor, nodo(Raiz, Izq, Der), nodo(Raiz, Izq, NuevoDer)) :-
    Valor > Raiz, % Eliminamos el subarbol derecho
    eliminar(Valor, Der, NuevoDer).

% Obtiene el valor maximo de un arbol
obtener_maximo(nodo(Valor, _, vacio), Valor).
obtener_maximo(nodo(_, _, Der), Maximo) :- 
    obtener_maximo(Der, Maximo).

% Cambiar un valor en el arbol
cambiar(ValorActual, NuevoValor, Arbol, NuevoArbol) :-
    eliminar(ValorActual, Arbol, ArbolSinValor),
    insertar(NuevoValor, ArbolSinValor, NuevoArbol).

% Visualizar el ABB en una lista
abb_a_lista(vacio, []).
abb_a_lista(nodo(Raiz, Izq, Der), Lista) :-
    abb_a_lista(Izq, ListaIzq),
    abb_a_lista(Der, ListaDer),
    append(ListaIzq, [Raiz|ListaDer], Lista).

% Función para convertir un árbol a un formato JSON-compatible 
arbol_a_json(vacio, []).
arbol_a_json(nodo(Raiz, Izq, Der), [Raiz, IzqJSON, DerJSON]) :-
    arbol_a_json(Izq, IzqJSON),
    arbol_a_json(Der, DerJSON).

% vaciar el arbol
vaciar_arbol :-
    retract(arbol(_)),
    assert(arbol(vacio)).