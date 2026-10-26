export type StepName = "cleaned" | "dried" | "roasted" | "popped";

const stepImages: Record<StepName, { src: string; alt: string }> = {
  cleaned: {
    src: "/images/steps/step-cleaned-transparent.png",
    alt: "Hand harvesting lily seed from water with water lilies",
  },
  dried: {
    src: "/images/steps/step-dried-transparent.png",
    alt: "Raised wooden tray drying makhana seeds under the sun",
  },
  roasted: {
    src: "/images/steps/step-roasted-transparent.png",
    alt: "Makhana seeds roasting in a traditional iron kadhai over wood fire",
  },
  popped: {
    src: "/images/steps/step-popped-transparent.png",
    alt: "Artisan hand pointing at a puffed white makhana pop",
  },
};

export default function StepArt({ name }: { name: StepName }) {
  const step = stepImages[name];
  return (
    <img
      src={step.src}
      alt={step.alt}
      className={`step-illustration step-illustration-${name}`}
      width={1024}
      height={1024}
      loading="lazy"
    />
  );
}
