import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

/** react query */
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

/** Instantiate query client */
/** @queryClient gives access to the react query cache wherever queryClient is passed */

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/** @queryClient new isntance of QueryClient */
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  /** @client passed queryClient to the whole app component which allows the app to access the query cache */
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastContainer position='top-center' />
    </QueryClientProvider>
  </React.StrictMode>
);
