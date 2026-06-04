import Image from "next/image";
import type { Block } from "@/lib/blog";
import { slugifyHeading } from "@/lib/blog";

/* ---------- inline **bold** parser ---------- */
function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      // Emphasis kept as normal-weight text (no bold), per design.
      return <span key={i}>{part.slice(2, -2)}</span>;
    }
    return <span key={i}>{part}</span>;
  });
}

function ListItem({ text }: { text: string }) {
  // Support a leading "**Lead.** rest" pattern → bold lead, normal rest
  return <span className="leading-relaxed">{renderInline(text)}</span>;
}

export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={i}
                id={slugifyHeading(block.text)}
                className="scroll-mt-28 pt-6 text-[1.6rem] font-semibold leading-snug tracking-tight text-slate-900 sm:text-[1.85rem]"
              >
                {block.text}
              </h2>
            );

          case "subheading":
            return (
              <h3
                key={i}
                id={slugifyHeading(block.text)}
                className="scroll-mt-28 pt-2 text-lg font-semibold tracking-tight text-slate-900 sm:text-xl"
              >
                {renderInline(block.text)}
              </h3>
            );

          case "paragraph":
            return (
              <p key={i} className="text-[1.05rem] leading-[1.85] text-slate-600">
                {renderInline(block.text)}
              </p>
            );

          case "list":
            return block.ordered ? (
              <ol
                key={i}
                className="ml-1 list-none space-y-3 text-[1.02rem] text-slate-600"
              >
                {(block.items ?? []).map((item, j) => (
                  <li key={j} className="flex gap-3.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[0.72rem] font-bold text-white">
                      {j + 1}
                    </span>
                    <ListItem text={item} />
                  </li>
                ))}
              </ol>
            ) : (
              <ul
                key={i}
                className="ml-1 space-y-3 text-[1.02rem] text-slate-600"
              >
                {(block.items ?? []).map((item, j) => (
                  <li key={j} className="flex gap-3.5">
                    <span
                      className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-slate-900"
                      aria-hidden
                    />
                    <ListItem text={item} />
                  </li>
                ))}
              </ul>
            );

          case "table":
            return (
              <div
                key={i}
                className="my-2 overflow-hidden overflow-x-auto rounded-2xl border border-slate-200 shadow-sm"
              >
                <table className="w-full min-w-[520px] border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-slate-900 text-white">
                      {(block.headers ?? []).map((h, j) => (
                        <th
                          key={j}
                          className="px-4 py-3.5 font-semibold tracking-tight first:rounded-tl-2xl last:rounded-tr-2xl"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(block.rows ?? []).map((row, r) => (
                      <tr
                        key={r}
                        className="border-t border-slate-100 odd:bg-white even:bg-slate-50/60"
                      >
                        {row.map((cell, c) => (
                          <td
                            key={c}
                            className={`px-4 py-3.5 align-top text-slate-600 ${
                              c === 0 ? "font-medium text-slate-900" : ""
                            }`}
                          >
                            {renderInline(cell)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );

          case "callout": {
            const variant = block.variant ?? "key";
            const styles =
              variant === "warning"
                ? "border-amber-200 bg-amber-50"
                : variant === "info"
                ? "border-slate-200 bg-slate-50"
                : "border-slate-300 bg-slate-50";
            return (
              <div
                key={i}
                className={`my-2 rounded-2xl border ${styles} p-5 sm:p-6`}
              >
                {block.title && (
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.14em] text-slate-900">
                    {block.title}
                  </p>
                )}
                <p className="text-[1.02rem] font-medium leading-relaxed text-slate-700">
                  {renderInline(block.text ?? "")}
                </p>
              </div>
            );
          }

          case "image":
            return (
              <figure key={i} className="my-4">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <Image
                    src={block.src ?? ""}
                    alt={block.alt ?? ""}
                    width={1600}
                    height={1000}
                    className="h-auto w-full object-cover"
                  />
                </div>
                {block.caption && (
                  <figcaption className="mt-2.5 text-center text-sm text-slate-400">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}
