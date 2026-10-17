// Structured data for Google (schema.org JSON-LD). Invisible on the page.
// "<" is escaped so text from the Studio can never close the <script> tag early.
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({ "@context": "https://schema.org", ...data }).replace(/</g, "\\u003c"),
      }}
    />
  );
}
