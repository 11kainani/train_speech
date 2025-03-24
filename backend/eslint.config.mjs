import { defineConfig } from "eslint/config";
import globals from "globals";
import js from "@eslint/js";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: {
        ...globals.node,  // Add Node.js globals
        process: "readonly",  // Specifically ensure 'process' is treated as a global
        ...globals.jest,
      },
    },
    plugins: { js },
    extends: ["js/recommended"],
  },
]);