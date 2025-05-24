
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// #ai-reason: Import and initialize modular architecture
import { moduleManager } from './modules'

/**
 * Initialize modules before rendering the app
 * @ai_context Ensures all services are available when components mount
 */
async function initializeApp() {
  try {
    // #ai-reason: Initialize modular architecture first
    await moduleManager.initialize();
    console.log('✅ Modular architecture initialized successfully');
    
    // #ai-reason: Render app after modules are ready
    createRoot(document.getElementById("root")!).render(<App />);
  } catch (error) {
    console.error('❌ Failed to initialize application:', error);
    // #ai-reason: Still render app for development, but log the error
    createRoot(document.getElementById("root")!).render(<App />);
  }
}

// #ai-reason: Start the application
initializeApp();
