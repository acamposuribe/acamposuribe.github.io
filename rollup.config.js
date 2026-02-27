import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from "@rollup/plugin-terser";
import cleanup from "rollup-plugin-cleanup";
import html from '@rollup/plugin-html';

const config = {
  input: "src/index.js",
  output: [
    {
      dir: "dist",
      format: "umd",
    },
  ],
  plugins: [
    nodeResolve(),
    terser({
      module: true,
      compress: {
        keep_infinity: true,
        module: true,
        passes: 3,
        toplevel: true,
      },
    }),
    cleanup({ comments: "none" }),
    html({
      title: "Welcome to DPA !",
      template: ({ files, publicPath, title }) => 
`<html>
  <head> 
    <title>${title}</title>
    <style>
        *, *::before, *::after { box-sizing: border-box; }
        html, body { margin: 0; padding: 0; width: 100%; height: 100%; overflow: hidden; }
        canvas {
          display: block !important;
          width: 100vw !important;
          height: 100vh !important;
          max-width: none !important;
          max-height: none !important;
          object-fit: cover !important;
        }
    </style>
  </head>
  <body>
    ${files.js.map(js => `<script src="${publicPath}${js.fileName}"></script>`).join('\n')}
  </body>
</html>`
    })
  ],
};

export default config;
