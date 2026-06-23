import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { OtpInput } from "./OtpInput";

const meta: Meta<typeof OtpInput> = {
  title: "Atoms/OtpInput",
  component: OtpInput,
  parameters: { layout: "padded" },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof OtpInput>;

export const Default: Story = {
  render: () => {
    const [code, setCode] = useState("");
    return (
      <div style={{ width: 360 }}>
        <OtpInput value={code} onChange={setCode} />
        <p className="mt-3 text-[13px] text-neutral-grey-4">Valeur : {code || "—"}</p>
      </div>
    );
  },
};

export const Prefilled: Story = {
  render: () => {
    const [code, setCode] = useState("4291");
    return (
      <div style={{ width: 360 }}>
        <OtpInput value={code} onChange={setCode} />
      </div>
    );
  },
};

export const ErrorState: Story = {
  name: "Error",
  render: () => {
    const [code, setCode] = useState("429100");
    return (
      <div style={{ width: 360 }}>
        <OtpInput value={code} onChange={setCode} error />
        <p className="mt-3 text-[13px] font-semibold text-semantic-danger">
          Code incorrect · 2 essais restants
        </p>
      </div>
    );
  },
};
