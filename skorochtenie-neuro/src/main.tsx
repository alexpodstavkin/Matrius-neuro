import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { captureUtmsFromUrl } from './lib/leads';
import './styles.css';

// Один раз при загрузке: сохраняем UTM-метки из URL в sessionStorage,
// чтобы они дожили до момента submit'а формы (в т.ч. после внутренних якорей).
captureUtmsFromUrl();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
