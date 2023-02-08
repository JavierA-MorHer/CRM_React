import React from "react";
import {Form, redirect, useNavigate} from "react-router-dom";
import {deleteCliente} from "../api/clientes.js";


export async function action({params}){
    const {clienteId} = params;
    await deleteCliente(clienteId)
    return redirect('/');
}

export const Cliente = ({ cliente }) => {
    const navigate = useNavigate();

    const { nombre, empresa, telefono,id, email }= cliente;


  return (
    <tr className="border-b">
      <td className="p-6">
        <p className="text-2xl text-gray-800">{nombre}</p>
        <small>Empresa: </small> 
        <p>{empresa}</p>  
      </td>

        <td className="p-6">
            <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold"> Email: </span>{email}</p>
            <p className="text-gray-600"> <span className="text-gray-800 uppercase font-bold"> Teléfono: </span>{telefono}</p>
        </td>

        <td className="p-6 flex gap-3">
            <button type="button" onClick={ ()=>navigate(`/clientes/${id}/editar`) } className="text-blue-600 hover:text-blue-700 uppercase font-bold text-xs">Editar</button>
            <Form method="post"
                  action={`/clientes/${id}/eliminar`}
                  onSubmit={(e)=>{
                      if(!confirm('Deseas eliminar este registro?')){
                          e.preventDefault();

                      }
                  } }
            >
                <button type="submit"  className="text-red-600 hover:text-red-700 uppercase font-bold text-xs">Eliminar</button>
            </Form>
        </td>
    </tr>
  );
};
