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

// Source imports are extensionless (`./lib/utils`), and TypeScript copies them
// verbatim into the emitted declarations. Node16/NodeNext consumers can't
// resolve those from an ESM-flavoured `.d.ts`, so every re-export in the root
// barrel silently drops out. Rewriting the specifiers here keeps the source
// clean while still shipping declarations that resolve under every
// moduleResolution mode.
const addDeclarationExtensions = () => ({
  name: "add-declaration-extensions",
  generateBundle(_options, bundle) {
    const declarations = new Set(
      Object.keys(bundle).filter((f) => f.endsWith(".d.ts")),
    );
    const resolve = (fromFile, spec) => {
      const base = new URL(spec, `file:///${fromFile}`).pathname.slice(1);
      if (declarations.has(`${base}.d.ts`)) return `${spec}.js`;
      if (declarations.has(`${base}/index.d.ts`)) return `${spec}/index.js`;
      return null;
    };
    for (const fileName of declarations) {
      const file = bundle[fileName];
      file.source = file.source.replace(
        /((?:from|import)\s+)"(\.[^"]*)"/g,
        (match, prefix, spec) => {
          if (/\.(js|css|json)$/.test(spec)) return match;
          const rewritten = resolve(fileName, spec);
          if (!rewritten) {
            this.warn(`Could not resolve "${spec}" in ${fileName}`);
            return match;
          }
          return `${prefix}"${rewritten}"`;
        },
      );
    }
  },
});

/** @type {() => import('rollup').RollupOptions} */
const createConfig = (format, dir) => ({
  // `lib/types` is type-only, so nothing in the graph keeps it alive as a
  // runtime module. Listing it as an entry forces an (empty) JS file to be
  // emitted so the `@fransek/ui/types` subpath export resolves at runtime.
  input: ["src/index.ts", "src/lib/utils.ts", "src/lib/types.ts"],
  // `lib/types` has no runtime exports, so its chunk is expected to be empty.
  onwarn(warning, warn) {
    if (warning.code === "EMPTY_BUNDLE") return;
    warn(warning);
  },
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
        // `rootDir` keeps declarations beside their JS (dist/<fmt>/index.d.ts)
        // instead of nested under dist/<fmt>/src/.
        rootDir: "src",
        declarationDir: dir,
        emitDeclarationOnly: true,
      },
      exclude: ["**/*.test.ts", "**/*.spec.ts", "stories/**/*"],
    }),
    postcss({
      plugins: [postcssImport(), cssnano({ preset: "default" })],
      extract: "theme.css",
    }),
    ...(format === "cjs" ? [emitCjsPackageJson()] : []),
    // Must come after the typescript plugin — it emits the declarations.
    addDeclarationExtensions(),
  ],
});

export default [
  createConfig("cjs", "dist/cjs"),
  createConfig("esm", "dist/esm"),
];
