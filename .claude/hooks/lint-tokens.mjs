#!/usr/bin/env node
/**
 * lint-tokens.mjs — PostToolUse hook Labster DS
 * Adapté de DLS-Lead (Nadiyq) pour React + Tailwind CSS.
 *
 * Vérifie que les fichiers TSX/CSS/TS ne contiennent pas de valeurs
 * hardcodées qui devraient passer par les tokens Labster.
 *
 * Usage :
 *   node .claude/hooks/lint-tokens.mjs <file>        # lint un fichier (bloque si ERROR)
 *   node .claude/hooks/lint-tokens.mjs --all         # audit tous les src/components/
 *   node .claude/hooks/lint-tokens.mjs --report      # rapport sans blocage
 *
 * Exit codes :
 *   0 — aucune violation ERROR
 *   1 — au moins une violation ERROR (bloque le PostToolUse)
 */

import { readFileSync, readdirSync, statSync } from "fs";
import { join, extname, relative } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "../..");

// ─── Tokens Labster autorisés (classes Tailwind configurées) ────────────────
// Les couleurs et tailles doivent utiliser les classes Tailwind du tailwind.config.ts
// ou les variables CSS de src/tokens/index.ts — pas de valeurs brutes.

const RULES = [
  // ── Couleurs hardcodées ──────────────────────────────────────────────────
  {
    id: "no-hex-color",
    level: "ERROR",
    pattern: /#[0-9A-Fa-f]{3,8}\b/,
    excludePattern: /\/\/.*#|\/\*.*#|\*.*#/,
    message: "Couleur hex hardcodée détectée. Utiliser les classes Tailwind configurées (ex: text-navy, bg-blue) ou les tokens src/tokens/index.ts.",
    extensions: [".tsx", ".ts", ".css"],
    excludeFiles: ["tailwind.config.ts", "src/tokens/index.ts", "tokens/", ".stories.tsx"],
  },
  {
    id: "no-rgb-color",
    level: "ERROR",
    pattern: /\brgb[a]?\s*\(/,
    message: "Couleur rgb/rgba hardcodée. Utiliser les tokens Labster.",
    extensions: [".tsx", ".ts", ".css"],
    excludeFiles: ["tailwind.config.ts", "src/tokens/index.ts", "tokens/"],
  },
  // ── Classes Tailwind arbitraires ────────────────────────────────────────
  {
    id: "no-arbitrary-color",
    level: "ERROR",
    pattern: /\b(?:bg|text|border|ring|shadow|fill|stroke)-\[#[0-9A-Fa-f]/,
    message: "Classe Tailwind arbitraire avec hex détectée (ex: bg-[#476AE3]). Utiliser bg-blue, bg-navy, etc. selon tailwind.config.ts.",
    extensions: [".tsx", ".ts"],
    excludeFiles: [],
  },
  {
    id: "no-arbitrary-size",
    level: "WARN",
    pattern: /\b(?:text|w|h|p|px|py|pt|pb|pl|pr|m|mx|my|mt|mb|ml|mr|gap|space-x|space-y)-\[\d+(?:\.\d+)?(?:px|rem|em)\]/,
    message: "Classe Tailwind arbitraire avec valeur dimensionnelle. Préférer les classes d'espacement configurées (gap-2, p-4, etc.).",
    extensions: [".tsx", ".ts"],
    excludeFiles: [],
  },
  // ── Style inline avec couleur ────────────────────────────────────────────
  {
    id: "no-inline-style-color",
    level: "ERROR",
    pattern: /style=\{\{[^}]*(?:color|background|backgroundColor|borderColor)\s*:\s*['"]#/,
    message: "Style inline avec couleur hex. Utiliser les classes Tailwind ou les tokens CSS.",
    extensions: [".tsx"],
    excludeFiles: [],
  },
  // ── Tokens CSS directs sans variable ────────────────────────────────────
  {
    id: "no-hardcoded-font-size",
    level: "WARN",
    pattern: /font-size\s*:\s*\d+(?:\.\d+)?(?:px|rem)\s*(?:;|,|\})/,
    message: "font-size hardcodé en CSS. Utiliser les classes Tailwind de typographie (text-sm, text-base, etc.).",
    extensions: [".css"],
    excludeFiles: ["tokens/"],
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function shouldExclude(filePath, rule) {
  const rel = relative(ROOT, filePath);
  return rule.excludeFiles?.some((ex) => rel.includes(ex)) ?? false;
}

function lintFile(filePath) {
  const ext = extname(filePath);
  const violations = [];

  let content;
  try {
    content = readFileSync(filePath, "utf-8");
  } catch {
    return violations;
  }

  const lines = content.split("\n");

  for (const rule of RULES) {
    if (!rule.extensions.includes(ext)) continue;
    if (shouldExclude(filePath, rule)) continue;

    lines.forEach((line, i) => {
      // Ignorer les commentaires
      const stripped = line.replace(/\/\/.*$/, "").replace(/\/\*.*?\*\//g, "");
      if (!rule.pattern.test(stripped)) return;
      if (rule.excludePattern?.test(line)) return;

      violations.push({
        file: relative(ROOT, filePath),
        line: i + 1,
        content: line.trim().slice(0, 100),
        rule: rule.id,
        level: rule.level,
        message: rule.message,
      });
    });
  }

  return violations;
}

function collectFiles(dir) {
  const files = [];
  try {
    for (const entry of readdirSync(dir)) {
      const full = join(dir, entry);
      if (statSync(full).isDirectory()) {
        if (!["node_modules", ".git", "dist", ".storybook"].includes(entry)) {
          files.push(...collectFiles(full));
        }
      } else if ([".tsx", ".ts", ".css"].includes(extname(full))) {
        files.push(full);
      }
    }
  } catch {}
  return files;
}

// ─── Main ────────────────────────────────────────────────────────────────────

const args = process.argv.slice(2);
const isAll = args.includes("--all");
const isReport = args.includes("--report");
const targetFile = args.find((a) => !a.startsWith("--"));

let filesToLint = [];

if (isAll) {
  filesToLint = collectFiles(join(ROOT, "src/components"));
} else if (targetFile) {
  filesToLint = [targetFile.startsWith("/") ? targetFile : join(ROOT, targetFile)];
} else {
  // Lire depuis stdin (PostToolUse hook : le fichier modifié est passé en contexte)
  process.exit(0);
}

const allViolations = filesToLint.flatMap(lintFile);
const errors = allViolations.filter((v) => v.level === "ERROR");
const warnings = allViolations.filter((v) => v.level === "WARN");

if (allViolations.length === 0) {
  console.log("✓ Aucune violation de tokens détectée.");
  process.exit(0);
}

// Affichage
if (errors.length > 0) {
  console.error(`\n🚫 ${errors.length} violation(s) ERROR — tokens Labster non respectés :\n`);
  for (const v of errors) {
    console.error(`  ${v.file}:${v.line}`);
    console.error(`  [${v.rule}] ${v.message}`);
    console.error(`  → ${v.content}\n`);
  }
}

if (warnings.length > 0) {
  console.warn(`\n⚠️  ${warnings.length} avertissement(s) WARN :\n`);
  for (const v of warnings) {
    console.warn(`  ${v.file}:${v.line} [${v.rule}] ${v.message}`);
  }
}

if (!isReport && errors.length > 0) {
  console.error("\n❌ Correction requise avant de continuer. Remplacer les valeurs hardcodées par les tokens Labster.");
  process.exit(1);
}

process.exit(0);