import type { Meta, StoryObj } from "@storybook/react";
import { Input, Button } from "@labster-ds-poc";

/**
 * Pattern : Contact Form Labster
 *
 * Composition de Input × 5 + Button (variant=accent-cta).
 * Réplication du pattern observé sur labster.io contact section.
 *
 * Layout 2 colonnes : copy gauche sur dark bg + form panel blanc à droite.
 */

const meta: Meta = {
  title: "Patterns/Contact Form (Labster)",
  parameters: {
    layout: "fullscreen",
    docs: {
      story: {
        // Render stories in an iframe so they get full viewport width
        // instead of being squeezed in the docs side panel.
        inline: false,
        iframeHeight: 900,
      },
      description: {
        component:
          "Replication du formulaire de contact Labster (labster.io). " +
          "Démonstration de composition Input + Button variant=accent-cta. " +
          "Le bouton 'Envoyer' utilise brand.red en POSITIVE role (pas danger). " +
          "💡 Astuce : passe en mode Canvas (icône en haut à droite, à côté de Docs) pour voir le pattern en pleine page.",
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen font-labster">
      {/* LEFT — dark bg with heading + copy + picto */}
      <div className="bg-neutral-grey-6 text-neutral-white p-12 lg:p-16 flex flex-col justify-center min-w-0">
        <h2 className="text-h3 lg:text-h2 mb-8">
          Démarrons
          <br />
          une discussion
        </h2>
        <p className="text-p-md mb-6">
          Vous souhaitez co-concevoir des solutions digitales avec vos
          utilisateurs métier ou augmenter la productivité de vos équipes
          de développement.
        </p>
        <p className="text-p-md">
          Notre équipe pluridisciplinaire est à votre écoute pour vous
          aider à créer des solutions innovantes qui seront de véritables
          relais de croissance pour votre activité.
        </p>
      </div>

      {/* RIGHT — form panel white */}
      <div className="bg-neutral-white p-12 lg:p-16 flex items-center min-w-0">
        <form className="w-full max-w-lg space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Nom" required size="default" />
            <Input label="Prénom" required size="default" />
          </div>
          <Input label="Entreprise" required size="default" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Email" type="email" required size="default" />
            <Input label="Téléphone" type="tel" size="default" />
          </div>
          <div>
            <label className="text-label-m text-neutral-grey-6 block mb-1">
              Message
            </label>
            <textarea
              rows={5}
              className="w-full bg-neutral-smoke border-none rounded-sm p-4 text-p-sm text-neutral-grey-6 placeholder:text-neutral-grey-3 focus:ring-2 focus:ring-semantic-action-primary focus:outline-none resize-none"
            />
          </div>
          <Button variant="accent-cta" size="Large" type="submit">
            Envoyer
          </Button>
        </form>
      </div>
    </div>
  ),
};

export const ContactFormSmokeBackground: Story = {
  name: "Variant : Smoke background (alternative)",
  render: () => (
    <div className="bg-neutral-smoke min-h-screen p-16 flex items-center justify-center font-labster">
      <div className="bg-neutral-white shadow-elevation-large rounded-lg p-12 max-w-2xl w-full">
        <h2 className="text-h3 text-neutral-grey-6 mb-2">
          Démarrons une discussion
        </h2>
        <p className="text-p-md text-neutral-grey-4 mb-8">
          Décrivez-nous votre besoin, nous reviendrons sous 48h ouvrées.
        </p>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Nom" required size="default" />
            <Input label="Prénom" required size="default" />
          </div>
          <Input label="Entreprise" required size="default" />
          <Input label="Email" type="email" required size="default" />
          <div>
            <label className="text-label-m text-neutral-grey-6 block mb-1">
              Message
            </label>
            <textarea
              rows={4}
              className="w-full bg-neutral-smoke border border-neutral-grey-1 rounded-sm p-4 text-p-sm text-neutral-grey-6 placeholder:text-neutral-grey-3 focus:ring-2 focus:ring-semantic-action-primary focus:outline-none resize-none"
            />
          </div>
          <Button variant="primary" size="Large" type="submit">
            Envoyer le message
          </Button>
        </form>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Variante : fond Smoke clair (ex : page contact dédiée plutôt que section sur homepage). Bouton 'primary' (bleu brand) au lieu de 'accent-cta' (rouge brand) car sur fond clair, le bleu est plus cohérent.",
      },
    },
  },
};
