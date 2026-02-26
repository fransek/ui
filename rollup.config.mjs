import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";

/** @type {() => import('rollup').RollupOptions} */
const createConfig = (format, dir) => ({
  input: "src/index.ts",
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
      extract: true,
      minimize: true,
    }),
  ],
});

export default [
  createConfig("cjs", "dist/cjs"),
  createConfig("esm", "dist/esm"),
];
