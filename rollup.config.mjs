import typescript from "@rollup/plugin-typescript";
import cssnano from "cssnano";
import postcssImport from "postcss-import";
import postcss from "rollup-plugin-postcss";

// The root package.json declares `"type": "module"`, so Node would parse the
// plain `.js` files in dist/cjs as ESM. A nested package.json flips them back.
const emitCjsPackageJson = () => ({
  name: "emit-cjs-package-json",
  generateBundle() {
    this.emitFile({
      type: "asset",
      fileName: "package.json",
      source: JSON.stringify({ type: "commonjs" }, null, 2),
    });
  },
});

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
    "date-fns",
    "recharts",
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
      plugins: [postcssImport(), cssnano({ preset: "default" })],
      extract: "theme.css",
    }),
    ...(format === "cjs" ? [emitCjsPackageJson()] : []),
  ],
});

export default [
  createConfig("cjs", "dist/cjs"),
  createConfig("esm", "dist/esm"),
];
