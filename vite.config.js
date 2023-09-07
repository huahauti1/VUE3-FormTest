import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  base:"/VUE3-FormTest/",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
      outDir: "docs",
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
  //跨域
  server:{
	  host: "0.0.0.0",
	  //热更新
	  hmr:true,
	  //设为true时若端口已经被占用则会直接退出，而不是尝试下一个可用端口
	  strictPort:false,
	  //自定义代理规则
	  proxy:{
		  //选项写法
		  "/api":{
			  target:"https://admin.huahuati.com",		//后台服务器地址
			  changeOrigin:true,				//允许跨域
			  rewrite:(path) => path.replace(/^\api/,""),
		  }
	  },
  }
})
