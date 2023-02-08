import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

// createBrowserRouter permite crear rutas por medio de objetos
// RouterProvider es el componente principal ahora y es por donde va a fluir la informacion
import { createBrowserRouter, RouterProvider  } from 'react-router-dom'
import { Layout } from './components/Layout';

//Action se usa para manejar el envio del formulario se utiliza action que es una funcion que nos permite ejecutar codigo
//Se renombra, ya que puedes tener multiples loader por distintos componentes
import { action as actionNuevoCliente, NuevoCliente } from './pages/NuevoCliente'

//Loader se usa para obtener datos de una API o de un objeto
//Se renombra, ya que puedes tener multiples loader por distintos componentes
import { Index, loader as clientesLoader } from './pages/Index'
import {ErrorPage} from "./components/ErrorMessage.jsx";
import {action as actionEditarCliente, EditarCliente, loader as EditarClienteLoader} from "./pages/EditarCliente.jsx";
import {action as actionEliminar } from './components/Cliente'

// CUANDO USAR useLoaderData y cuando usar useActionData
// useLoaderData se usa cuando quieres obtener el resultado de un loader
// useActionData se usa cuando quiere obtener el resultado de un action


// Se definen las rutas
//   path: 
//   element: componente que se va a renderizar cuando se entre a esa ruta

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    //Layout es el componente que siempre se va a mostrar en los componentes hijos (children)

    children:[
      //Con index:true, toma el layout, pero coloca el elemento que quiere ser mostrado en la ruta principal
      //no se define path, ya que hereda el path inicial
      {
        index:true, 
        element: <Index/>,
        loader: clientesLoader,
        //ErrorElement sirve para cuando hay errores en lugar de renderizar el error, se renderiza lo que se desea.
        errorElement: <ErrorPage/>
      },
      { 
        path: '/clientes/nuevo', 
        element:<NuevoCliente/>,
        action: actionNuevoCliente,
        errorElement: <ErrorPage/>
      },
        //Urls dinamicas, se especifica con dos puntos :
      {
        path: '/clientes/:clienteId/editar',
        element: <EditarCliente/>,
        loader: EditarClienteLoader,
        errorElement: <ErrorPage/>,
        action: actionEditarCliente
      },
      {
        path: '/clientes/:clienteId/eliminar',
        action: actionEliminar
      }
    ]
  }
]
  
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
