// vite.config.ts
import { defineConfig } from "file:///Users/attaimen/gitrepos/interview-task/node_modules/.pnpm/vite@5.4.11_@types+node@20.17.6/node_modules/vite/dist/node/index.js";
import react from "file:///Users/attaimen/gitrepos/interview-task/node_modules/.pnpm/@vitejs+plugin-react-swc@3.7.1_vite@5.4.11_@types+node@20.17.6_/node_modules/@vitejs/plugin-react-swc/index.mjs";
import tsconfigPaths from "file:///Users/attaimen/gitrepos/interview-task/node_modules/.pnpm/vite-tsconfig-paths@4.3.2_typescript@5.3.3_vite@5.4.11_@types+node@20.17.6_/node_modules/vite-tsconfig-paths/dist/index.mjs";
import pluginAPIRoutes from "file:///Users/attaimen/gitrepos/interview-task/node_modules/.pnpm/vite-plugin-api-routes@1.1.12_vite@5.4.11_@types+node@20.17.6_/node_modules/vite-plugin-api-routes/dist/index.js";
var vite_config_default = defineConfig({
  plugins: [react(), tsconfigPaths(), pluginAPIRoutes()],
  test: {
    globals: true,
    environment: "happy-dom",
    setupFiles: ".vitest/setup",
    include: ["**/*.test.{ts,tsx}"]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvYXR0YWltZW4vZ2l0cmVwb3MvaW50ZXJ2aWV3LXRhc2tcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9hdHRhaW1lbi9naXRyZXBvcy9pbnRlcnZpZXctdGFzay92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvYXR0YWltZW4vZ2l0cmVwb3MvaW50ZXJ2aWV3LXRhc2svdml0ZS5jb25maWcudHNcIjsvLy8gPHJlZmVyZW5jZSB0eXBlcz1cInZpdGVzdFwiIC8+XG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0LXN3YydcbmltcG9ydCB0c2NvbmZpZ1BhdGhzIGZyb20gJ3ZpdGUtdHNjb25maWctcGF0aHMnXG5pbXBvcnQgcGx1Z2luQVBJUm91dGVzIGZyb20gJ3ZpdGUtcGx1Z2luLWFwaS1yb3V0ZXMnXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gICAgcGx1Z2luczogW3JlYWN0KCksIHRzY29uZmlnUGF0aHMoKSwgcGx1Z2luQVBJUm91dGVzKCldLFxuICAgIHRlc3Q6IHtcbiAgICAgICAgZ2xvYmFsczogdHJ1ZSxcbiAgICAgICAgZW52aXJvbm1lbnQ6ICdoYXBweS1kb20nLFxuICAgICAgICBzZXR1cEZpbGVzOiAnLnZpdGVzdC9zZXR1cCcsXG4gICAgICAgIGluY2x1ZGU6IFsnKiovKi50ZXN0Lnt0cyx0c3h9J11cbiAgICB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixPQUFPLG1CQUFtQjtBQUMxQixPQUFPLHFCQUFxQjtBQUU1QixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUN4QixTQUFTLENBQUMsTUFBTSxHQUFHLGNBQWMsR0FBRyxnQkFBZ0IsQ0FBQztBQUFBLEVBQ3JELE1BQU07QUFBQSxJQUNGLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxJQUNiLFlBQVk7QUFBQSxJQUNaLFNBQVMsQ0FBQyxvQkFBb0I7QUFBQSxFQUNsQztBQUNKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
