import { useDroppable } from '@dnd-kit/core'
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import type { Column } from '../types/kanban'
import SortableKanbanItem from './SortableKanbanItem'

type KanbanColumnProps = {
  column: Column
}

export default function KanbanColumn({ column }: KanbanColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  })

  return (
    <section
      ref={setNodeRef}
      className="min-h-[calc(100vh-150px)] w-full rounded-2xl bg-gray-100 p-5 text-left "
    >
      <h2 className="text-lg font-bold text-slate-800">
        {column.title}
      </h2>

      <div className="my-4 h-px bg-white" />

      <SortableContext
        items={column.items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-4">
          {column.items.map((item) => (
            <SortableKanbanItem
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </SortableContext>
    </section>
  )
}