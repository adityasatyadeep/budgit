import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This binds the server to all network interfaces, including your public IP
    port: 5173,      // This sets the port to 5173
  },
});
