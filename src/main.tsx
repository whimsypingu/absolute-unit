import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from 'next-themes'

if ('serviceWorker' in navigator) {
	window.addEventListener('load', () => {
		navigator.serviceWorker.register('./sw.js')
			.then((reg) => console.log('Service Worker registered:', reg.scope))
			.catch((err) => console.log('Service Worker registration failed:', err));
	});
}

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
			<App />
		</ThemeProvider>
	</StrictMode>,
)
