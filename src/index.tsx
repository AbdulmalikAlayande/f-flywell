import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import reportWebVitals from './reportWebVitals';
import {ToastContainer} from "react-toastify";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <QueryClientProvider client={queryClient}>
        <ToastContainer/>
        <React.StrictMode>
            <App />
        </React.StrictMode>
    </QueryClientProvider>
);
/*
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
 <ReactQueryDevtools/>
*/
reportWebVitals();
