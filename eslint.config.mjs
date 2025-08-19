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
  {
    rules: {
      // Permitir variáveis não utilizadas durante desenvolvimento
      "@typescript-eslint/no-unused-vars": "warn",
      // Permitir uso de any em alguns casos específicos
      "@typescript-eslint/no-explicit-any": "warn",
      // Permitir interfaces vazias
      "@typescript-eslint/no-empty-object-type": "warn",
      // Permitir aspas não escapadas em JSX
      "react/no-unescaped-entities": "warn",
      // Permitir imagens sem alt durante desenvolvimento
      "jsx-a11y/alt-text": "warn"
    }
  }
];

export default eslintConfig;
