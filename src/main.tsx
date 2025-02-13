import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from './themeprovider.tsx';

import _ from "lodash";

declare global {
  interface Window {
    _: typeof _;
  }
}

window._ = _; 

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ToastContainer/>
          <StrictMode>
              <ThemeProvider>
                  <App />
              </ThemeProvider>
          </StrictMode>
      </LocalizationProvider>
    </QueryClientProvider>
)
