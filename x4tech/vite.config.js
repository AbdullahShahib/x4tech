import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const supabaseUrl = env.VITE_SUPABASE_URL || 'https://elkcgeumvoyyzagziplw.supabase.co';

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/supabase': {
          target: supabaseUrl,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api\/supabase/, ''),
        },
      },
    },
    resolve: {
      alias: {
        '@': '/src'
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (!id.includes('node_modules')) return;

            if (id.includes('react-quill')) return 'react-quill';
            if (id.includes('three')) return 'three';
            if (id.includes('framer-motion') || id.includes('/motion/')) return 'motion';
            if (id.includes('gsap')) return 'gsap';
            if (id.includes('@supabase')) return 'supabase';
            if (id.includes('firebase')) return 'firebase';
            if (id.includes('lucide-react')) return 'lucide-react';
            if (id.includes('react-router-dom')) return 'router';

            return 'vendor';
          }
        }
      }
    }
  };
})
