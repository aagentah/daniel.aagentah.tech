const previewSecret = "913xVt!V"; // Copy the string you used for SANITY_PREVIEW_SECRET

export default function resolveProductionUrl(document) {
  return `localhost:3000/api/sanity/preview?secret=${previewSecret}&page=${document._type}&slug=${document.slug.current}`;
}
