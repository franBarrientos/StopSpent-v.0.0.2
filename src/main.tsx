import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'
import { AppContextProvider } from './context/AppProvider.tsx'
import { RouterProvider } from "react-router-dom";
import router from './router.tsx' 

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider>
      <AppContextProvider>
        <RouterProvider router={router} />
      </AppContextProvider>
      </ChakraProvider>
  </React.StrictMode>,
)
