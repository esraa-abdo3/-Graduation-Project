
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   port: 5173, // ثبّت المنفذ على 5173
  //   strictPort: true, // يمنع Vite من استخدام منفذ مختلف إذا كان 5173 مشغولًا
  // },
})


