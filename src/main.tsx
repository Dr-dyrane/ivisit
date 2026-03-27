import React from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from './App';
import './index.css';
import { Analytics } from '@vercel/analytics/next';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

// Initialize theme before render
const root = document.documentElement;
const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
const savedTheme = localStorage.getItem('theme') || systemTheme;
root.classList.add(savedTheme);

// Register the generated service worker so updates can download and activate on load.
registerSW({ immediate: true });

createRoot(container).render(
  <React.StrictMode>
    <App />
    <Analytics />
  </React.StrictMode>
);
