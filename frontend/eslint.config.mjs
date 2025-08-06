import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Agrega esta nueva configuración
  {
    plugins: {
      "@typescript-eslint": typescriptEslint, // Registra el plugin
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off" // Desactiva la regla
    }
  }
];

export default eslintConfig;
