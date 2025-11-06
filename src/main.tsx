import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/index.css';
import App from '@/App.tsx';
import { Provider } from 'react-redux';
import { store } from '@/store/index.ts';
import momeetFaviconUrl from '@/assets/momeetLogo.svg?url';

const existingFavicon = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
if (existingFavicon) {
  existingFavicon.href = momeetFaviconUrl;
  existingFavicon.type = 'image/svg+xml';
} else {
  const linkEl = document.createElement('link');
  linkEl.rel = 'icon';
  linkEl.type = 'image/svg+xml';
  linkEl.href = momeetFaviconUrl;
  document.head.appendChild(linkEl);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
