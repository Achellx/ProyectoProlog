:- use_module(library(http/thread_httpd)).
:- use_module(library(http/http_dispatch)).
:- use_module(library(http/http_json)).
:- use_module(library(http/http_cors)).
:- use_module(library(http/json)).

% Importo el ABB maximo
:- consult('abb_maximo.pl').

% Estado inicial del ABB
:- dynamic(arbol/1).
arbol(vacio).

% Server
server(Port) :-
    http_server(http_dispatch, [port(Port)]).

% configurar CORS
:- set_setting(http:cors, [*]).

% Iniciar el server
:- initialization
    server(8080).

% Rutas del server
:- http_handler('/', root_handler, []).
:- http_handler('/insertar', insertar_handler, [method(post)]).
:- http_handler('/eliminar', eliminar_handler, [method(post)]).
:- http_handler('/cambiar', cambiar_handler, [method(post)]).
:- http_handler('/mostrar', mostrar_handler, [method(get)]).
:- http_handler('/options', options_handler, [method(options)]).
:- http_handler('/vaciar', vaciar_handler, [method(post)]).

% Handlers
root_handler(_Request) :-
    cors_enable(_Request, [methods([get, post, options])]),
    format('Content-type: text/plain~n~n'),
    format('Servidor ABB Maximo').

insertar_handler(Request) :-
    cors_enable(Request, [methods([post])]),
    http_read_json_dict(Request, Dict),
    Valor = Dict.valor,
    arbol(ArbolActual),
    insertar(Valor, ArbolActual, NuevoArbol),
    retract(arbol(ArbolActual)),
    assert(arbol(NuevoArbol)),
    arbol_a_json(NuevoArbol, ArbolJSON),
    reply_json_dict(_{mensaje: "Valor insertado", arbol: ArbolJSON}).

eliminar_handler(Request) :-
    cors_enable(Request, [methods([post])]),
    http_read_json_dict(Request, Dict),
    Valor = Dict.valor,
    arbol(ArbolActual),
    eliminar(Valor, ArbolActual, NuevoArbol),
    retract(arbol(ArbolActual)),
    assert(arbol(NuevoArbol)),
    arbol_a_json(NuevoArbol, ArbolJSON),
    reply_json_dict(_{mensaje: "Valor eliminado", arbol: ArbolJSON}).

cambiar_handler(Request) :-
    cors_enable(Request, [methods([post])]),
    http_read_json_dict(Request, Dict),
    ValorActual = Dict.valor_actual,
    NuevoValor = Dict.nuevo_valor,
    arbol(ArbolActual),
    cambiar(ValorActual, NuevoValor, ArbolActual, NuevoArbol),
    retract(arbol(ArbolActual)),
    assert(arbol(NuevoArbol)),
    arbol_a_json(NuevoArbol, ArbolJSON),
    reply_json_dict(_{mensaje: "Valor cambiado", arbol: ArbolJSON}).

mostrar_handler(Request) :-
    cors_enable(Request, [methods([get])]),
    arbol(ArbolActual),
    arbol_a_json(ArbolActual, ArbolJSON),
    reply_json_dict(_{arbol: ArbolJSON}).

vaciar_handler(Request) :-
    cors_enable(Request, [methods([post])]),
    vaciar_arbol,
    reply_json_dict(_{mensaje: "Arbol vaciado"}).

options_handler(Request) :-
    cors_enable(Request, [methods([get, post, options])]),
    format('Content-type: text/plain~n~n'),
    format('').