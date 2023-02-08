
//Funcion donde se van a realizar las peticiones hacia la API

import {json} from "react-router-dom";

export async function getClientes(){

    //El url de la API viene de las variables de entorno
    const respuesta = await fetch(import.meta.env.VITE_API_URL);
    const resultado = await respuesta.json();

    return resultado;
}

export async function getClientesById(id){

    //El url de la API viene de las variables de entorno
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    const resultado = await respuesta.json();

    return resultado;
}

//Metodo POST
export async function nuevoCliente(datos){
    try {
        //Por default fetch es un GET pero si queremos realizar otro metodo se tiene que indicar
        const respuesta = await fetch(import.meta.env.VITE_API_URL,{
            method:'POST',
            //body es la informacion que se va a insertar y se convirte en JSON
            body: JSON.stringify(datos),
            headers:{
                'Content-type':'application/json'
            }
        });
        await respuesta.json();
    }catch (e){

    }
}

export async function updateCliente(id, datos){
    try {
        //Por default fetch es un GET pero si queremos realizar otro metodo se tiene que indicar
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method:'PUT',
            //body es la informacion que se va a insertar y se convirte en JSON
            body: JSON.stringify(datos),
            headers:{
                'Content-type':'application/json'
            }
        });
        await respuesta.json();
    }catch (e){

    }
}

export async function deleteCliente(id){
    try {
        //Por default fetch es un GET pero si queremos realizar otro metodo se tiene que indicar
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`,{
            method:'DELETE'
        });
        await respuesta.json();
    }catch (e){

    }
}