// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// //import Components from 'unplugin-vue-components/vite';
// import styleImport,{ VantResolver } from 'vite-plugin-style-import';
//
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue(),styleImport({
//     resolvers: [VantResolver()],
//   }),]
// })


import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

export default {
  plugins: [
    vue(),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
};




