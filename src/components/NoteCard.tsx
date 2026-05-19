import type { NoteItem } from '../types/kanban'

type NoteCardProps = {
  note: NoteItem
}

const noteColorClass = {
  yellow: 'bg-yellow-200 text-slate-900',
  blue: 'bg-blue-300 text-slate-900',
  purple: 'bg-purple-300 text-slate-900',
  green: 'bg-emerald-300 text-slate-900',
}

export default function NoteCard({ note }: NoteCardProps) {
  return (
<div className={`w-full rounded-xl p-4 ${noteColorClass[note.color]}`}>
          {note.title && (
        <h3 className="text-base font-bold leading-snug">
          {note.title}
        </h3>
      )}

      {note.content && (
        <p className={note.title ? 'mt-3 text-sm' : 'text-sm'}>
          {note.content}
        </p>
      )}

      {note.bullets && note.bullets.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
          {note.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
    </div>
  )
}