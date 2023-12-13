import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from "./App";
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
);

/*
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();
<QueryClientProvider client={queryClient}>
  <React.StrictMode>
    <App />
    <ReactQueryDevtools/>
  </React.StrictMode>
</QueryClientProvider>
*/
reportWebVitals();
