import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import type { KanbanItem } from '../types/kanban'
import TaskCard from './TaskCard'
import NoteCard from './NoteCard'

type SortableKanbanItemProps = {
  item: KanbanItem
}

export default function SortableKanbanItem({ item }: SortableKanbanItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: item.id,
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    touchAction: 'none',
    willChange: 'transform',
    zIndex: isDragging ? 99 : undefined,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={[
        'cursor-grab touch-none active:cursor-grabbing',
        isDragging ? 'opacity-40' : 'opacity-100',
      ].join(' ')}
    >
      {item.type === 'task' ? (
        <TaskCard task={item} />
      ) : (
        <NoteCard note={item} />
      )}
    </div>
  )
}