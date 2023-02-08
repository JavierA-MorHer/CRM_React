import React from 'react';
import {getClientesById, nuevoCliente, updateCliente} from "../api/clientes.js";
import {Form, redirect, useActionData, useLoaderData, useNavigate} from "react-router-dom";
import {Error} from "../components/Error.jsx";
import {Formulario} from "../components/Formulario.jsx";

export async function loader({params}){
    //En los params viene los paramametros que especificamos en las rutas, en este caso el clienteId
     const cliente = await getClientesById(params.clienteId);

     //Validaciones, crear mensajes de error personalizados
    if( Object.values(cliente).length ===0 )
        throw new Response('',{
            status: 404,
            statusText:'No hay resultados'
        })
     return cliente;
}

export async function action({request, params }){
    const formData = await request.formData();

    //Array donde se colocaran los errores de validaciones
    const errores = [];

    //Se almacenan los datos del formulario de las entradas del objeto
    const datos = Object.fromEntries(formData);

    //Se obtiene el valor del email
    const email = formData.get('email');

    //Expresion regular para validar email
    let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

    if(!regex.test((email))){
        errores.push('Email no es valido');
    }

    if( Object.values(datos).includes('') ){
        errores.push('Todos los campos son obligatorios');
    }



    //Retornar datos si hay errores
    if( Object.keys(errores).length ){

        return errores;
    }

    //Si esta en este punto significa que la validacion esta correcta
    await updateCliente(params.clienteId, datos);

    //Una vez que se realiza el proceso se redirecciona a la pagina principal
    //Se recomienda el uso de redirect en action y loaders
    return redirect('/');

}

export const EditarCliente = () => {

    const navigate = useNavigate();
    const cliente = useLoaderData()
    const errores = useActionData();

    return (
        <>
            <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
            <p className='mt-3'>A continuacion podras modificar los datos de un cliente</p>

            <div className='flex justify-end'>
                <button onClick={ ()=>navigate('/') }
                        className='bg-blue-800 text-white px-3 py-1 font-bold uppercase'>
                    Volver
                </button>
            </div>

            <div className=' bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>

                {/* Componente Form de React-router-dom para que el action funcione */}
                <Form method='post'>

                    {/*Componente creado para mostrar error */}
                    { errores?.length  && errores?.map( (error,i)=> <Error key={i}>{error}</Error>)}
                    <Formulario cliente={cliente}/>
                    <input type="submit" className='cursor-pointer mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
                           value='Actualizar cliente'
                    />


                </Form>
            </div>
        </>
    );
}


