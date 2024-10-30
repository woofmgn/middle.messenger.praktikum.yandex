import { defineConfig } from "vite";
import { resolve, relative } from "path";
import { readdirSync, statSync } from "fs";
import handlebars from "vite-plugin-handlebars";

function collectPartials(dirPath: string, partials: string[] = []) {
  const files = readdirSync(dirPath);

  files.forEach((fileName) => {
    const filePath = resolve(dirPath, fileName);

    if (statSync(filePath).isDirectory()) {
      collectPartials(filePath, partials);
    } else if (filePath.endsWith(".hbs")) {
      const partialPath = resolve(dirPath, filePath)
        .replaceAll(/\\/g, "/")
        .replace(/\/[^/]+\.hbs$/, "");

      partials.push(partialPath);
    }
  });

  return partials;
}

const partials = collectPartials(resolve(__dirname, "src/components"));

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: partials,
    }),
  ],
  root: resolve(__dirname, "src"),
  build: {
    outDir: resolve(__dirname, "dist"),
  },
});
