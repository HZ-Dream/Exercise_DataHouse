import { useState } from "react";
import type { TaskItem } from "../types/kanban";
import ProgressBar from "./ProgressBar";

type TaskCardProps = {
  task: TaskItem;
};

export default function TaskCard({ task }: TaskCardProps) {
  const [isCompact, setIsCompact] = useState(task.variant === "compact");
  function renderTextWithLinks(
    text: string,
    links?: { text: string; url: string }[],
  ) {
    if (!links || links.length === 0) {
      return text;
    }

    let parts: React.ReactNode[] = [text];

    links.forEach((link) => {
      parts = parts.flatMap((part) => {
        if (typeof part !== "string") return part;

        const splitText = part.split(link.text);

        return splitText.flatMap((segment, index) => {
          const result: React.ReactNode[] = [];

          if (segment) {
            result.push(segment);
          }

          if (index < splitText.length - 1) {
            result.push(
              <a
                key={`${link.url}-${index}`}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="font-medium text-blue-600 underline underline-offset-2 hover:text-blue-700"
              >
                {link.text}
              </a>,
            );
          }

          return result;
        });
      });
    });

    return parts;
  }
  const handleToggleCompact = () => {
    setIsCompact((current) => !current);
  };

  return (
    <article
      onClick={handleToggleCompact}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleToggleCompact();
        }
      }}
      className={[
        "w-full cursor-pointer select-none rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md ",
        isCompact ? "p-4" : "p-5",
      ].join(" ")}
    >
      {!isCompact && task.imageUrl && (
        <img
          src={task.imageUrl}
          alt={task.imageAlt || task.title}
          className="mb-4 h-32 w-full rounded-lg object-cover"
        />
      )}

      <div className="flex items-start justify-between gap-3">
        <h3
          className={[
            "font-bold leading-snug text-slate-900",
            isCompact ? "text-base" : "text-xl",
          ].join(" ")}
        >
          {task.title}
        </h3>

        {task.emoji && (
          <span className={isCompact ? "text-xl" : "text-2xl"}>
            {task.emoji}
          </span>
        )}
      </div>

      {!isCompact && task.description && (
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          {renderTextWithLinks(task.description, task.links)}
        </p>
      )}

      {!isCompact && task.bullets && task.bullets.length > 0 && (
        <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-snug text-slate-700">
          {task.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}

      <div
        className={[
          "flex items-center justify-between gap-3",
          isCompact ? "mt-4" : "mt-6",
        ].join(" ")}
      >
        {task.date && (
          <div className="flex items-center gap-3 text-xs font-bold uppercase text-slate-500">
            <span className="flex h-6 w-6 items-center justify-center rounded border border-slate-300 text-sm">
              🗓️
            </span>
            <span>{task.date}</span>
          </div>
        )}

        {task.assignees && task.assignees.length > 0 && (
          <div className="flex -space-x-2">
            {task.assignees.map((assignee, index) => (
              <div
                key={`${assignee}-${index}`}
                className={[
                  "flex items-center justify-center rounded-full bg-pink-300 ring-2 ring-white",
                  isCompact ? "h-8 w-8 text-sm" : "h-10 w-10 text-lg",
                ].join(" ")}
              >
                {assignee}
              </div>
            ))}
          </div>
        )}
      </div>

      <ProgressBar status={task.status} />
    </article>
  );
}
