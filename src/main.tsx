import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react';
import './index.css'
import App from './App.tsx'
import { store, persistor } from './app/store.ts'
import { ToastProvider } from './components/ui/toast/index.tsx';

const root = createRoot(document.getElementById('root')!)
// persistor.purge();
root.render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ToastProvider>
          <App />
          </ToastProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
