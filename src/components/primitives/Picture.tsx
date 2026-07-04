import { asset } from "../../lib/asset";

// <picture> with AVIF → WebP fallback. width/height are always set to reserve
// layout space (zero CLS). `name` maps to public/screens/<name>.{avif,webp}.
export function Picture({
  name,
  alt,
  width,
  height,
  className = "",
  loading = "lazy",
  formats = ["avif", "webp"],
  sizes,
  fetchPriority,
}: {
  name: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  loading?: "lazy" | "eager";
  formats?: ("avif" | "webp")[];
  sizes?: string;
  fetchPriority?: "high" | "low" | "auto";
}) {
  const webp = formats.includes("webp");
  const avif = formats.includes("avif");
  return (
    <picture>
      {avif && <source srcSet={asset(`screens/${name}.avif`)} type="image/avif" />}
      {webp && <source srcSet={asset(`screens/${name}.webp`)} type="image/webp" />}
      <img
        src={asset(`screens/${name}.${webp ? "webp" : "png"}`)}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding="async"
        sizes={sizes}
        fetchPriority={fetchPriority}
        className={className}
      />
    </picture>
  );
}
