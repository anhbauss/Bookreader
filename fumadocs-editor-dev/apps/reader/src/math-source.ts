export function extractEquationTag(text: string): { expression: string; equationTag?: string } {
  // Extract only the label; do not unescape valid TeX set delimiters in the body.
  const normalized = text;
  const match = /\\tag\s*(?:\\?\{([^{}\n]*?)\\?\}|\(([^()\n]*)\))/.exec(normalized);
  if (!match) return { expression: normalized };
  const equationTag = (match[1] ?? match[2] ?? "").trim();
  return {
    expression: normalized.slice(0, match.index) + normalized.slice(match.index + match[0].length),
    equationTag: equationTag || undefined,
  };
}

export function normalizeMathSource(text: string): string {
  return normalizeBrokenDelimiters(
    normalizeUnicodeMath(
      text
      // Some staged Markdown preserves an escaped TeX command (for example `\\\\frac`).
      // Collapse that extra escape only for known commands, never for general `\\\\` line breaks.
      .replace(/\\\\(?=(?:frac|dfrac|tfrac|sqrt|sum|prod|int|iint|iiint|oint|lim|exp|ln|log|sin|cos|tan|cot|sec|csc|left|right|begin|end|text|mathrm|mathbf|mathbb|Omega|theta|pi|alpha|beta|gamma|delta|ldots|dots|cdot|times|pm|leq|geq|neq|to|rightarrow|leftarrow)\b)/g, "\\")
      .replace(/\\\{([^{}\n]*)\\\}/g, "{$1}")
      .replace(/\\left\s*\{/g, "\\left\\{")
      .replace(/\\right\s*\}/g, "\\right\\}")
      .replace(/\\+tag\s*(?:\\+\{[^{}\n]*\\+\}|\{[^{}\n]*\}|\([^()\n]*\))/g, "")
      .replace(/\\\s+/g, " "),
    ),
  );
}

/** Unicode math symbols that OCR emits but KaTeX does not reliably render. */
const UNICODE_MATH: Record<string, string> = {
  "⩾": "\\geq",
  "⩽": "\\leq",
  "≥": "\\geq",
  "≤": "\\leq",
  "≠": "\\neq",
  "≈": "\\approx",
  "≡": "\\equiv",
  "×": "\\times",
  "·": "\\cdot",
  "∑": "\\sum",
  "∫": "\\int",
  "∏": "\\prod",
  "∞": "\\infty",
  "→": "\\rightarrow",
  "⇒": "\\Rightarrow",
  "∈": "\\in",
  "∉": "\\notin",
  "⊂": "\\subset",
  "⊆": "\\subseteq",
  "∪": "\\cup",
  "∩": "\\cap",
  "θ": "\\theta",
  "λ": "\\lambda",
  "μ": "\\mu",
  "Σ": "\\Sigma",
  "α": "\\alpha",
  "β": "\\beta",
  "γ": "\\gamma",
  "δ": "\\delta",
  "π": "\\pi",
  "σ": "\\sigma",
  "ω": "\\omega",
  "Ω": "\\Omega",
  "φ": "\\phi",
  "Φ": "\\Phi",
  "√": "\\sqrt",
};

function normalizeUnicodeMath(text: string): string {
  return text.replace(/[⩾⩽≥≤≠≈≡×·∑∫∏∞→⇒∈∉⊂⊆∪∩θλμΣαβγδπσωΩφΦ√]/g, (ch) => UNICODE_MATH[ch] ?? ch);
}

function delimiterEnvironment(open: string, close: string): string | null {
  if (open === "{" && close === ".") return "cases";
  if (open === "{" && close === "}") return "matrix";
  if (open === "(" && close === ")") return "pmatrix";
  if (open === "[" && close === "]") return "bmatrix";
  if (open === "|" && close === "|") return "vmatrix";
  return null;
}

function splitCaseRow(line: string): string {
  const ifMatch = /\s+if\s+/i.exec(line);
  if (ifMatch && ifMatch.index !== undefined) {
    const value = line.slice(0, ifMatch.index).trim();
    const condition = line.slice(ifMatch.index + ifMatch[0].length).trim();
    return `${value} & \\text{if } ${condition}`;
  }
  const otherwise = /^(.+?)\s*,?\s*otherwise\.?$/i.exec(line);
  if (otherwise) return `${otherwise[1].trim()} & \\text{otherwise}`;
  const comma = line.indexOf(",");
  if (comma >= 0) return `${line.slice(0, comma).trim()} & ${line.slice(comma + 1).trim()}`;
  return line;
}

/**
 * OCR splits a `\left<delim> ... \right<delim>` structure across lines with raw text
 * inside it. That is not valid KaTeX: the content must be a single expression, or a
 * proper ``cases``/``matrix`` environment. Convert the common multi-line forms into
 * the environment KaTeX understands, keeping single-line `\left...\right` unchanged.
 */
function normalizeBrokenDelimiters(text: string): string {
  return text.replace(
    /\\left\s*(\\?[{[(\|])([\s\S]*?)\\right\s*(\\?[}\])\|]|\.)/g,
    (_full, open: string, body: string, close: string) => {
      const lines = body.split(/\r?\n/).map((line: string) => line.trim()).filter(Boolean);
      if (lines.length <= 1) return _full;
      const openChar = open.startsWith("\\") ? open.slice(1) : open;
      const closeChar = close.startsWith("\\") ? close.slice(1) : close;
      const env = delimiterEnvironment(openChar, closeChar);
      if (!env) return _full;
      if (env === "cases") {
        const rows = lines.map((line) => splitCaseRow(line));
        return `\\begin{cases}\n${rows.join(" \\\\\n")}\n\\end{cases}`;
      }
      const rows = lines.map((line) => line.split(/\s{2,}/).map((cell) => cell.trim()).join(" & "));
      return `\\begin{${env}}\n${rows.join(" \\\\\n")}\n\\end{${env}}`;
    },
  );
}

