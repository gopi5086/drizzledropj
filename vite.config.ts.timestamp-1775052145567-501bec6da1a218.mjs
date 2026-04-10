// vite.config.ts
import { defineConfig } from "file:///C:/Users/JAYASRI/Downloads/drizzle-background-new-branch-name/drizzle-background-new-branch-name/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/JAYASRI/Downloads/drizzle-background-new-branch-name/drizzle-background-new-branch-name/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { componentTagger } from "file:///C:/Users/JAYASRI/Downloads/drizzle-background-new-branch-name/drizzle-background-new-branch-name/node_modules/lovable-tagger/dist/index.js";
var __vite_injected_original_dirname = "C:\\Users\\JAYASRI\\Downloads\\drizzle-background-new-branch-name\\drizzle-background-new-branch-name";
var vite_config_default = defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false
    },
    proxy: {
      "/api": {
        target: "https://drizzle-background-5.onrender.com",
        changeOrigin: true
      },
      "/uploads": {
        target: "https://drizzle-background-5.onrender.com",
        changeOrigin: true
      }
    }
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxKQVlBU1JJXFxcXERvd25sb2Fkc1xcXFxkcml6emxlLWJhY2tncm91bmQtbmV3LWJyYW5jaC1uYW1lXFxcXGRyaXp6bGUtYmFja2dyb3VuZC1uZXctYnJhbmNoLW5hbWVcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXEpBWUFTUklcXFxcRG93bmxvYWRzXFxcXGRyaXp6bGUtYmFja2dyb3VuZC1uZXctYnJhbmNoLW5hbWVcXFxcZHJpenpsZS1iYWNrZ3JvdW5kLW5ldy1icmFuY2gtbmFtZVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvSkFZQVNSSS9Eb3dubG9hZHMvZHJpenpsZS1iYWNrZ3JvdW5kLW5ldy1icmFuY2gtbmFtZS9kcml6emxlLWJhY2tncm91bmQtbmV3LWJyYW5jaC1uYW1lL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSBcInZpdGVcIjtcbmltcG9ydCByZWFjdCBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3Qtc3djXCI7XG5pbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xuaW1wb3J0IHsgY29tcG9uZW50VGFnZ2VyIH0gZnJvbSBcImxvdmFibGUtdGFnZ2VyXCI7XG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiAoe1xuICBzZXJ2ZXI6IHtcbiAgICBob3N0OiBcIjo6XCIsXG4gICAgcG9ydDogODA4MCxcbiAgICBobXI6IHtcbiAgICAgIG92ZXJsYXk6IGZhbHNlLFxuICAgIH0sXG4gICAgcHJveHk6IHtcbiAgICAgIFwiL2FwaVwiOiB7XG4gICAgICAgIHRhcmdldDogXCJodHRwczovL2RyaXp6bGUtYmFja2dyb3VuZC01Lm9ucmVuZGVyLmNvbVwiLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICB9LFxuICAgICAgXCIvdXBsb2Fkc1wiOiB7XG4gICAgICAgIHRhcmdldDogXCJodHRwczovL2RyaXp6bGUtYmFja2dyb3VuZC01Lm9ucmVuZGVyLmNvbVwiLFxuICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtyZWFjdCgpLCBtb2RlID09PSBcImRldmVsb3BtZW50XCIgJiYgY29tcG9uZW50VGFnZ2VyKCldLmZpbHRlcihCb29sZWFuKSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICBcIkBcIjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgXCIuL3NyY1wiKSxcbiAgICB9LFxuICB9LFxufSkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUE4ZCxTQUFTLG9CQUFvQjtBQUMzZixPQUFPLFdBQVc7QUFDbEIsT0FBTyxVQUFVO0FBQ2pCLFNBQVMsdUJBQXVCO0FBSGhDLElBQU0sbUNBQW1DO0FBTXpDLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsUUFBUTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sS0FBSztBQUFBLE1BQ0gsU0FBUztBQUFBLElBQ1g7QUFBQSxJQUNBLE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxRQUNOLFFBQVE7QUFBQSxRQUNSLGNBQWM7QUFBQSxNQUNoQjtBQUFBLE1BQ0EsWUFBWTtBQUFBLFFBQ1YsUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLE1BQ2hCO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxNQUFNLEdBQUcsU0FBUyxpQkFBaUIsZ0JBQWdCLENBQUMsRUFBRSxPQUFPLE9BQU87QUFBQSxFQUM5RSxTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLEtBQUssUUFBUSxrQ0FBVyxPQUFPO0FBQUEsSUFDdEM7QUFBQSxFQUNGO0FBQ0YsRUFBRTsiLAogICJuYW1lcyI6IFtdCn0K
