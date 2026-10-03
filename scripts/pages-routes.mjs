// GitHub Pages kent geen SPA-routing: elke taalversie krijgt een eigen index.html (HTTP 200),
// en 404.html vangt alle overige paden op.
import { copyFileSync, mkdirSync } from "node:fs";

for (const lang of ["fr", "en", "tr"]) {
  mkdirSync(`dist/${lang}`, { recursive: true });
  copyFileSync("dist/index.html", `dist/${lang}/index.html`);
}
copyFileSync("dist/index.html", "dist/404.html");
console.log("pages-routes: fr, en, tr + 404.html");
