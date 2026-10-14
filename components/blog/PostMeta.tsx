import { formatDate } from "@/lib/posts";

type Props = {
  date?: string;
  readingTime: number;
  author?: string;
};

// "By Natalie · October 20, 2026 · 6 min read" (the date appears once the post has one)
export default function PostMeta({ date, readingTime, author }: Props) {
  const parts: React.ReactNode[] = [];
  if (author) parts.push(<span key="author">By {author}</span>);
  if (date) parts.push(<time key="date" dateTime={date}>{formatDate(date)}</time>);
  parts.push(<span key="time">{readingTime} min read</span>);

  return (
    <p className="text-[13px] text-subtle">
      {parts.map((part, index) => (
        <span key={index}>
          {index > 0 && " · "}
          {part}
        </span>
      ))}
    </p>
  );
}
