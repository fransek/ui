import typescript from "@rollup/plugin-typescript";
import postcssImport from "postcss-import";
import postcss from "rollup-plugin-postcss";

/** @type {() => import('rollup').RollupOptions} */
const createConfig = (format, dir) => ({
  input: "src/index.ts",
  external: [
    "react",
    "react-dom",
    "lucide-react",
    "clsx",
    "tailwind-merge",
    "react-day-picker",
    /@base-ui\/react\/.*/,
  ],
  output: {
    dir,
    format,
    sourcemap: true,
    preserveModules: true,
  },
  plugins: [
    typescript({
      compilerOptions: {
        declarationDir: dir,
        emitDeclarationOnly: true,
      },
      exclude: ["**/*.test.ts", "**/*.spec.ts", "src/stories/**/*"],
    }),
    postcss({
      plugins: [postcssImport()],
      extract: "theme.css",
      minimize: true,
    }),
  ],
});

export default [
  createConfig("cjs", "dist/cjs"),
  createConfig("esm", "dist/esm"),
];
