import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';

// Declare gtag type
declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
  }
}

// Preload critical assets
const preloadLinks = [
  { href: '/assets/profile.jpg', as: 'image', type: 'image/jpeg', fetchPriority: 'high' },
  { href: '/assets/video3.webm', as: 'video', type: 'video/webm', fetchPriority: 'high' },
  { href: '/assets/video3.mp4', as: 'video', type: 'video/mp4', fetchPriority: 'high' },
  { href: '/assets/video-poster.jpg', as: 'image', type: 'image/jpeg', fetchPriority: 'high' },
  { href: 'https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&family=Noto+Sans+Bengali:wght@400;700&display=swap', as: 'style', fetchPriority: 'high' }
];

// Add DNS prefetch for external resources
const dnsPrefetchLinks = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://images.unsplash.com',
  'https://plus.unsplash.com'
];

// Add preconnect for external resources
const preconnectLinks = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://images.unsplash.com',
  'https://plus.unsplash.com'
];

// Add preload links
preloadLinks.forEach(link => {
  const linkElement = document.createElement('link');
  Object.entries(link).forEach(([key, value]) => {
    linkElement.setAttribute(key, value);
  });
  document.head.appendChild(linkElement);
});

// Add DNS prefetch links
dnsPrefetchLinks.forEach(href => {
  const linkElement = document.createElement('link');
  linkElement.setAttribute('rel', 'dns-prefetch');
  linkElement.setAttribute('href', href);
  document.head.appendChild(linkElement);
});

// Add preconnect links
preconnectLinks.forEach(href => {
  const linkElement = document.createElement('link');
  linkElement.setAttribute('rel', 'preconnect');
  linkElement.setAttribute('href', href);
  document.head.appendChild(linkElement);
});

// Initialize performance monitoring
const initPerformanceMonitoring = () => {
  if ('performance' in window) {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'largest-contentful-paint') {
          // Report LCP to analytics
          if (typeof window.gtag !== 'undefined') {
            window.gtag('event', 'LCP', {
              event_category: 'Performance',
              event_label: entry.name,
              value: Math.round(entry.startTime),
              non_interaction: true
            });
          }
        }
      });
    });

    observer.observe({ entryTypes: ['largest-contentful-paint'] });
  }
};

// Initialize performance optimizations
if ('requestIdleCallback' in window) {
  window.requestIdleCallback(() => {
    initPerformanceMonitoring();
  });
} else {
  initPerformanceMonitoring();
}

// Create root element
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Failed to find the root element');
}

// Render app with error boundary
const root = ReactDOM.createRoot(rootElement);

const AppWithProviders = () => (
  <React.StrictMode>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </React.StrictMode>
);

root.render(<AppWithProviders />);
