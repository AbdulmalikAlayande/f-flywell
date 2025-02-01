import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from './themeprovider.tsx';


const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
        <ToastContainer/>
        <StrictMode>
            <ThemeProvider>
                <App />
            </ThemeProvider>
        </StrictMode>
    </QueryClientProvider>
)
