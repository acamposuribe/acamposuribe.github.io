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
        body { margin: 0; height: 100%; display: flex; justify-content: center; align-items: center; }
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
