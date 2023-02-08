import React from 'react'
import {useNavigate, Form, useActionData, redirect} from 'react-router-dom'
import { Formulario } from '../components/Formulario';
import {Error} from "../components/Error.jsx";
import {nuevoCliente} from "../api/clientes.js";



//Función asíncrona que realiza una peticion(en este caso cuando se hace el posteo del formulario)
// y mediante el formData podemos acceder al valor name requerido
export async  function action({ request }){
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
    await nuevoCliente(datos);

 //Una vez que se realiza el proceso se redirecciona a la pagina principal
    //Se recomienda el uso de redirect en action y loaders
 return redirect('/');

}





export const NuevoCliente = () => {

    //useNavigate nos permite navegdar de forma programada
    const navigate = useNavigate();

    //Nos permite recuperar la informacion que se envia desde el action
    const errores = useActionData();

  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Nuevo Clientes</h1>
        <p className='mt-3'>Llena todos los campos para registrar un nuevo cliente</p>

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
                <Formulario/>
                <input type="submit" className='cursor-pointer mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
                       value='Registrar cliente'
                       />


            </Form>
        </div>
    </>
  )
}
