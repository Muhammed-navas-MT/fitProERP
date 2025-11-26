import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {QueryClientProvider,QueryClient} from "@tanstack/react-query";
import { Provider } from 'react-redux';
import {persistor,store} from "./store/store.ts";
import { PersistGate } from 'redux-persist/integration/react';

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <App/>
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </StrictMode>,
)
