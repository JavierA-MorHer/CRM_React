import { useLoaderData } from "react-router-dom";
import { Cliente } from "../components/Cliente";
import {getClientes} from "../api/clientes.js";

//Loader es una funcion que se va a ejecutar cuando el componente cargue
// ideal para consultar un state o para consumir una API y mostrarlo en un componente
export function loader(){

    //Se consume el servicio y se guarda en la variable
    const clientes = getClientes();

    //En el loader SIEMPRE hay que retornar algo, si no marcar error y se renderiza el Error Boundaries,
    //que son componentes que toman los errores y los renderizan
    return clientes;
}


export const Index = () => {

    //Con este hook pueden acceder a lo que hayas retornado en el loader especificado en las rutas
    const clientes = useLoaderData();

  return (
    <>
        <h1 className='font-black text-4xl text-blue-900'>Clientes</h1>
        <p className='mt-3'>Administra tus clientes</p>
         {clientes.length 
                    ? (
                        <table className="w-full bg-withe shadow mt-5 table-auto">
                            <thead className="bg-blue-800 text-white">
                                <tr>
                                    <th>Cliente</th>
                                    <th>Contacto</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {/* Se itera el arreglo de clientes y se manda al componente para 
                                        poder manipularlo */}
                                    {
                                        clientes.map( cliente => (
                                            <Cliente cliente={cliente} key={cliente.id}/>
                                        ))
                                    }
                                </tbody>

                        </table>
                    )
                    :(
                        <p clasName="text-center mt-10">No hay clientes aun</p>
                    )}
    </>
  )
}
