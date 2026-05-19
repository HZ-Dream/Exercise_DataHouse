export type TaskLink = {
  text: string
  url: string
}

export type ColumnId = 'todo' | 'in-progress' | 'done' | 'archive'

export type TaskStatus = ColumnId

export type TaskVariant = 'normal' | 'compact'

export type NoteColor = 'yellow' | 'blue' | 'purple' | 'green'

export type TaskItem = {
  id: string
  type: 'task'
  variant?: TaskVariant
  status: TaskStatus
  columnId?: ColumnId

  title: string
  description?: string
  bullets?: string[]

  imageUrl?: string
  imageAlt?: string

  date?: string
  emoji?: string
  assignees?: string[]
  links?: TaskLink[]
}

export type NoteItem = {
  id: string
  type: 'note'
  title?: string
  content?: string
  bullets?: string[]
  color: NoteColor
  columnId?: ColumnId
}

export type KanbanItem = TaskItem | NoteItem

export type Column = {
  id: ColumnId
  title: string
  items: KanbanItem[]
}

// Dữ liệu column trả về từ MockAPI
export type ApiColumn = {
  id: ColumnId
  title: string
  order: number
}

// Dữ liệu item trả về từ MockAPI
export type ApiKanbanItem = KanbanItem & {
  columnId: ColumnId
  order: number
}

