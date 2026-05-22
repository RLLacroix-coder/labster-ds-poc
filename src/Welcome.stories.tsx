import type { Meta, StoryObj } from "@storybook/react";
import { colors, elevation } from "./tokens";

const meta: Meta = {
  title: "DS Labster/Welcome",
};

export default meta;
type Story = StoryObj;

export const About: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-12 font-labster">
      <h1 className="text-h2 mb-4 text-neutral-grey-6">Labster Design System</h1>
      <p className="text-p-md text-neutral-grey-3 mb-12">
        V1.0 POC — Generated 2026-05-22. Source : <code className="text-neutral-grey-6">labster-ds-poc</code> repo.
      </p>

      <h2 className="text-h4 mb-4 text-neutral-grey-6">What's in this Storybook</h2>
      <ul className="text-p-md text-neutral-grey-4 space-y-2 mb-8 list-disc list-inside">
        <li><strong>Atoms</strong> — Button (Input, Card coming in B.4)</li>
        <li><strong>Tokens</strong> — color palette, typography scale, elevation</li>
        <li><strong>Patterns</strong> — composed examples (contact form, login screen — coming)</li>
      </ul>

      <h2 className="text-h4 mb-4 text-neutral-grey-6">4-layer architecture</h2>
      <ol className="text-p-md text-neutral-grey-4 space-y-2 mb-8 list-decimal list-inside">
        <li><strong>Tokenization</strong> — <code>src/tokens/index.ts</code> + <code>tailwind.config.ts</code></li>
        <li><strong>Intent</strong> — <code>components/*.design.md</code> + <code>components/*.metadata.ts</code></li>
        <li><strong>Indexing</strong> — <code>.ai/*.json</code></li>
        <li><strong>Orchestration</strong> — <code>CLAUDE.md</code> + <code>rules/</code></li>
      </ol>

      <h2 className="text-h4 mb-4 text-neutral-grey-6">Typography note</h2>
      <p className="text-p-sm text-neutral-grey-3 mb-8">
        Brand font is <strong>Fieldwork</strong> (commercial). Without it installed,
        this Storybook falls back to <strong>Inter</strong> via Google Fonts.
        Structure preserved, brand fidelity partial.
      </p>

      <h2 className="text-h4 mb-4 text-neutral-grey-6">Quickstart for developers</h2>
      <pre className="bg-neutral-grey-6 text-neutral-white p-4 rounded-md text-p-sm overflow-x-auto">
        {`import { Button } from "labster-ds-poc";

<Button variant="primary" size="Medium">
  Save changes
</Button>

<Button variant="accent-cta" size="Large">
  Envoyer
</Button>`}
      </pre>
    </div>
  ),
};

// =============================================================================
// TOKENS VISUALIZATION
// =============================================================================

export const Tokens: Story = {
  render: () => (
    <div className="max-w-6xl mx-auto p-12 font-labster">
      <h1 className="text-h3 mb-8 text-neutral-grey-6">Tokens</h1>

      <h2 className="text-h5 mb-4 text-neutral-grey-6">Brand colors</h2>
      <div className="grid grid-cols-6 gap-4 mb-12">
        {Object.entries(colors.brand).map(([name, hex]) => (
          <div key={name}>
            <div
              className="w-full h-24 rounded-md border border-neutral-grey-1"
              style={{ backgroundColor: hex }}
            />
            <p className="text-p-sm text-neutral-grey-6 mt-2 font-semibold">{name}</p>
            <p className="text-link text-neutral-grey-3">{hex}</p>
          </div>
        ))}
      </div>

      <h2 className="text-h5 mb-4 text-neutral-grey-6">Semantic colors</h2>
      <div className="grid grid-cols-6 gap-4 mb-12">
        {Object.entries(colors.semantic).map(([name, hex]) => (
          <div key={name}>
            <div
              className="w-full h-24 rounded-md border border-neutral-grey-1"
              style={{ backgroundColor: hex }}
            />
            <p className="text-p-sm text-neutral-grey-6 mt-2 font-semibold">{name}</p>
            <p className="text-link text-neutral-grey-3">{hex}</p>
          </div>
        ))}
      </div>

      <h2 className="text-h5 mb-4 text-neutral-grey-6">Neutral colors</h2>
      <div className="grid grid-cols-8 gap-4 mb-12">
        {Object.entries(colors.neutral).map(([name, hex]) => (
          <div key={name}>
            <div
              className="w-full h-24 rounded-md border border-neutral-grey-1"
              style={{ backgroundColor: hex }}
            />
            <p className="text-p-sm text-neutral-grey-6 mt-2 font-semibold">{name}</p>
            <p className="text-link text-neutral-grey-3">{hex}</p>
          </div>
        ))}
      </div>

      <h2 className="text-h5 mb-4 text-neutral-grey-6">Typography</h2>
      <div className="space-y-4 mb-12">
        <p className="text-h1 text-neutral-grey-6">H1 — The quick brown fox</p>
        <p className="text-h2 text-neutral-grey-6">H2 — The quick brown fox</p>
        <p className="text-h3 text-neutral-grey-6">H3 — The quick brown fox</p>
        <p className="text-h4 text-neutral-grey-6">H4 — The quick brown fox</p>
        <p className="text-h5 text-neutral-grey-6">H5 — The quick brown fox</p>
        <p className="text-h6 text-neutral-grey-6">H6 — The quick brown fox</p>
        <p className="text-p-md text-neutral-grey-4">Paragraph Medium — The quick brown fox jumps over the lazy dog. Used for body emphasis and long-form text.</p>
        <p className="text-p-sm text-neutral-grey-4">Paragraph Small — The quick brown fox jumps over the lazy dog. Used for helper text, descriptions, captions.</p>
        <p className="text-label-m text-neutral-grey-6">Label M — Used for form labels above fields.</p>
        <p className="text-button-label text-neutral-grey-6">BUTTON LABEL — Used in button instances.</p>
      </div>

      <h2 className="text-h5 mb-4 text-neutral-grey-6">Elevation</h2>
      <div className="grid grid-cols-3 gap-8 mb-12 p-8 bg-neutral-smoke rounded-md">
        {Object.entries(elevation).map(([name, value]) => (
          <div
            key={name}
            className="bg-neutral-white p-6 rounded-md"
            style={{ boxShadow: value }}
          >
            <p className="text-p-sm text-neutral-grey-6 font-semibold">elevation.{name}</p>
            <p className="text-link text-neutral-grey-3 mt-1 break-all">{value}</p>
          </div>
        ))}
      </div>
    </div>
  ),
};
