import path from "path";
import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  // Load env file based on `mode` in the current directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  
  console.log('Environment mode:', mode);
  console.log('VITE_SUPABASE_URL exists:', !!env.VITE_SUPABASE_URL);

  return {
    define: {
      // Make env variables accessible via process.env for legacy code
      'process.env': env
    },
    base: process.env.NODE_ENV === "development" ? "/" : process.env.VITE_BASE_PATH || "/",
    optimizeDeps: {
      entries: ["src/main.tsx"],
    },
    plugins: [react()],
    resolve: {
      preserveSymlinks: true,
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      allowedHosts: true,
      port: 5005,
      host: true,
      headers: {
        'X-Custom-Header': 'test-value',
        'ngrok-skip-browser-warning': 'any-value',
      },
      proxy: {
        '/api': {
          target: 'http://localhost:5174', // Proxy API requests to the Express server
          changeOrigin: true,
          secure: false,
        }
      },
      hmr: {
        clientPort: 5005, // Explicitly set the WebSocket port
      }
    }
  };
});
