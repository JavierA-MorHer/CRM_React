import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';

export const Layout = () => {

    //Hook para obtener el path donde nos encontramos actualmente
    const location = useLocation();

    //Funcion que evalua si una ruta esta activa y agrega las clases
   function isActive( ruta ){
        return location.pathname === ruta 
                ?'text-blue-300'
                :'text-white'
    }

  return (
    <div className='md:flex md:min-h-screen'>
        <aside className='md:w-1/4 bg-blue-900 px-5 py-10'>
                <h2 className='text-4xl font-black text-center text-white'>CRM Clientes</h2>

                <nav className='mt-10'>
                    {/* Para navegar entre rutas en lugar de la etiqueta <a></a> se usa <Link> */}
                    <Link to='./'
                          className={` ${isActive('/')} text-2xl block mt-2 hover:text-blue-300 text-white`} >
                            Clientes
                    </Link>
                    <Link className={`${isActive('/clientes/nuevo')}  text-2xl block mt-2 hover:text-blue-300 text-white`} to='./clientes/nuevo'>Nuevo Cliente</Link>
                </nav>
        </aside>
       
        <main className='md:w-3/4 p-10 md:h-screen overflow-scroll'>
            {/* Todos los componentes hijos se van a renderizar en este componente <Outlet/> */}
            <Outlet/>
        </main>

       
    </div>
  )
}
