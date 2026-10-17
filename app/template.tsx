// A template (unlike a layout) is re-created on every navigation,
// so its animation plays each time a new page opens: a soft fade-up.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="animate-page-in">{children}</div>;
}
