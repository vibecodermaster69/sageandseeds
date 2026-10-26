// logo-mark.png is the wreath and wordmark; logo-full.png adds the tagline.
// Both are transparent cut-outs of public/images/logo.jpg (the client's artwork).
export default function Logo({
  full = false,
  height = 84,
}: {
  full?: boolean;
  height?: number;
}) {
  const [src, width, tall] = full
    ? ["/images/logo-full.png", 624, 670]
    : ["/images/logo-mark.png", 624, 592];
  return (
    <img
      className="logo-image"
      src={src}
      alt="Sage & Seeds — Clean. Nourishing. Honest."
      width={Math.round((height * width) / tall)}
      height={height}
    />
  );
}
