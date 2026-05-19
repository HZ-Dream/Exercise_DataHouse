import type { TaskStatus } from '../types/kanban'

type ProgressBarProps = {
  status: TaskStatus
}

const progressByStatus: Record<TaskStatus, number> = {
  todo: 33.333,
  'in-progress': 50,
  done: 100,
  archive: 100,
}

export default function ProgressBar({ status }: ProgressBarProps) {
  const progress = progressByStatus[status] ?? 0

  return (
    <div className="mt-4 h-2.5 w-full overflow-hidden rounded-full ">
      <div
        className="h-full rounded-full bg-linear-to-r from-lime-300 via-emerald-400 to-teal-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}