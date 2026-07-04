import { asset } from "../../lib/asset";

// The real ZiG app icon, used as the brand mark everywhere for consistency
// with the Android app and the GitHub repo.
export function Logo({
  className = "",
  alt = "ZiG",
  priority = false,
}: {
  className?: string;
  alt?: string;
  priority?: boolean;
}) {
  return (
    <img
      src={asset("screens/logo.webp")}
      srcSet={`${asset("screens/logo.webp")} 1x, ${asset("screens/logo@2x.webp")} 2x`}
      alt={alt}
      width={96}
      height={96}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      className={`rounded-[22%] ${className}`}
    />
  );
}
