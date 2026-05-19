import type {
  ApiColumn,
  ApiKanbanItem,
  Column,
  ColumnId,
  KanbanItem,
} from '../types/kanban'

const API_URL = import.meta.env.VITE_API_URL

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    throw new Error(`API error: ${response.status} - ${errorText}`)
  }

  return response.json()
}

export async function getColumnsApi(): Promise<ApiColumn[]> {
  return [
    {
      id: 'todo',
      title: 'To Do',
      order: 1,
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      order: 2,
    },
    {
      id: 'done',
      title: 'Done',
      order: 3,
    },
    {
      id: 'archive',
      title: 'Archive',
      order: 4,
    },
  ]
}

export async function getItemsApi(): Promise<ApiKanbanItem[]> {
  const response = await request<{ data: ApiKanbanItem[] }>(
    `${API_URL}/board_items`,
  )

  return response.data
}

export async function getBoardApi(): Promise<Column[]> {
  const [columns, items] = await Promise.all([
    getColumnsApi(),
    getItemsApi(),
  ])

  const sortedColumns = [...columns].sort((a, b) => a.order - b.order)

  return sortedColumns.map((column) => {
    const columnItems = items
      .filter((item) => item.columnId === column.id)
      .sort((a, b) => a.order - b.order)
      .map<KanbanItem>((item) => {
        if (item.type === 'task') {
          return {
            id: String(item.id),
            type: 'task',
            status: column.id,
            columnId: column.id,
            title: item.title,

            ...(item.variant !== undefined && {
              variant: item.variant,
            }),

            ...(item.description !== undefined && {
              description: item.description,
            }),

            ...(item.bullets !== undefined && {
              bullets: item.bullets,
            }),

            ...(item.imageUrl !== undefined && {
              imageUrl: item.imageUrl,
            }),

            ...(item.imageAlt !== undefined && {
              imageAlt: item.imageAlt,
            }),

            ...(item.date !== undefined && {
              date: item.date,
            }),

            ...(item.emoji !== undefined && {
              emoji: item.emoji,
            }),

            ...(item.assignees !== undefined && {
              assignees: item.assignees,
            }),
          }
        }

        return {
          id: String(item.id),
          type: 'note',
          columnId: column.id,
          color: item.color,

          ...(item.title !== undefined && {
            title: item.title,
          }),

          ...(item.content !== undefined && {
            content: item.content,
          }),

          ...(item.bullets !== undefined && {
            bullets: item.bullets,
          }),
        }
      })

    return {
      id: column.id,
      title: column.title,
      items: columnItems,
    }
  })
}

export async function updateItemApi(
  itemId: string,
  data: Partial<ApiKanbanItem>,
): Promise<ApiKanbanItem> {
  
  return request<ApiKanbanItem>(`${API_URL}/board_items/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}
export async function updateItemColumnApi(
  itemId: string,
  columnId: ColumnId,
  order?: number,
): Promise<ApiKanbanItem> {
  return updateItemApi(itemId, {
    columnId,
    status: columnId,
    ...(order !== undefined ? { order } : {}),
  } as Partial<ApiKanbanItem>)
}

export async function updateItemOrderApi(
  itemId: string,
  order: number,
): Promise<ApiKanbanItem> {
  return updateItemApi(itemId, {
    order,
  })
}

export async function createItemApi(
  data: Omit<ApiKanbanItem, 'id'>,
): Promise<ApiKanbanItem> {
  return request<ApiKanbanItem>(`${API_URL}/board_items`, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

export async function deleteItemApi(itemId: string): Promise<void> {
  await fetch(`${API_URL}/board_items/${itemId}`, {
    method: 'DELETE',
  })
}