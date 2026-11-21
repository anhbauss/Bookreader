// Loaded only for formulas KaTeX cannot render. SVG embeds its own glyph paths,
// so the desktop app needs neither CDN scripts nor external MathJax fonts.
import { mathjax } from "mathjax-full/js/mathjax.js";
import { TeX } from "mathjax-full/js/input/tex.js";
import { SVG } from "mathjax-full/js/output/svg.js";
import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html.js";
import "mathjax-full/js/input/tex/ams/AmsConfiguration.js";
import "mathjax-full/js/input/tex/newcommand/NewcommandConfiguration.js";
import "mathjax-full/js/input/tex/bbox/BboxConfiguration.js";
import "mathjax-full/js/input/tex/physics/PhysicsConfiguration.js";

const adaptor = liteAdaptor();
RegisterHTMLHandler(adaptor);
export function renderMathJax(expression: string, display: boolean): string {
  // Isolate macro definitions and equation counters between source blocks.
  const document = mathjax.document("", {
    InputJax: new TeX({
      packages: ["base", "ams", "newcommand", "bbox", "physics"],
      maxBuffer: 20_000,
      maxMacros: 1_000,
      formatError: (_jax: unknown, error: Error) => { throw error; },
    }),
    OutputJax: new SVG({ fontCache: "none" }),
  });
  const node = document.convert(expression, { display, em: 16, ex: 8, containerWidth: 1_120 });
  const markup = adaptor.outerHTML(node);
  if (markup.includes('data-mml-node="merror"')) throw new Error("Formula could not be rendered");
  return markup;
}
