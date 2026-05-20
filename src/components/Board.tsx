import { useEffect, useState } from "react";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import type { Column, KanbanItem } from "../types/kanban";
import KanbanColumn from "./KanbanColumn";
import TaskCard from "./TaskCard";
import NoteCard from "./NoteCard";

import { getBoardApi, updateItemApi } from "../services/kanbanApi";

export default function Board() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeItem, setActiveItem] = useState<KanbanItem | null>(null);
  useEffect(() => {
    async function fetchBoard() {
      try {
        setLoading(true);
        const data = await getBoardApi();
        setColumns(data);
      } catch (error) {
        console.error(error);
        setError("Cannot load board data");
      } finally {
        setLoading(false);
      }
    }

    fetchBoard();
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 6,
      },
    }),
  );

  const findColumnIndexByItemId = (columnList: Column[], itemId: string) => {
    return columnList.findIndex((column) =>
      column.items.some((item) => item.id === itemId),
    );
  };

  const findColumnIndexByOverId = (columnList: Column[], overId: string) => {
    return columnList.findIndex(
      (column) =>
        column.id === overId || column.items.some((item) => item.id === overId),
    );
  };

  const findItemById = (itemId: string) => {
    for (const column of columns) {
      const item = column.items.find((columnItem) => columnItem.id === itemId);

      if (item) {
        return item;
      }
    }

    return null;
  };
  const syncColumnItemsToApi = async (column: Column) => {
    await Promise.all(
      column.items.map((item, index) => {
        const data = item.type === 'task'
          ? { columnId: column.id, status: column.id, order: index + 1 }
          : { columnId: column.id, order: index + 1 }

        return updateItemApi(item.id, data)
      })
    )
  }

  const handleDragStart = (event: DragStartEvent) => {
    const itemId = String(event.active.id);
    const item = findItemById(itemId);

    if (item) {
      setActiveItem(item);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
      if (!over) {
        console.log('over is null - dropped outside')
        return
      }
      
      const activeId = String(active.id)
      const overId = String(over.id)
      
    if (activeId === overId) {
      console.log('same id - skipping')
      console.log('all column items:', columns.map(c => ({ 
        colId: c.id, 
        items: c.items.map(i => ({ id: i.id, type: typeof i.id })) 
      })))
      return
    }

    const sourceColumnIndex = findColumnIndexByItemId(columns, activeId);
    const targetColumnIndex = findColumnIndexByOverId(columns, overId);

    if (sourceColumnIndex === -1 || targetColumnIndex === -1) return;

    const sourceColumn = columns[sourceColumnIndex];
    const targetColumn = columns[targetColumnIndex];

    const activeItemIndex = sourceColumn.items.findIndex(
      (item) => item.id === activeId,
    );

    if (activeItemIndex === -1) return;

    const activeItemData = sourceColumn.items[activeItemIndex];

    const nextColumns = [...columns];

    const isSameColumn = sourceColumn.id === targetColumn.id;

    if (isSameColumn) {
      const overItemIndex = sourceColumn.items.findIndex(
        (item) => item.id === overId,
      );

      if (overItemIndex === -1) return;

      const updatedColumn: Column = {
        ...sourceColumn,
        items: arrayMove(sourceColumn.items, activeItemIndex, overItemIndex),
      };

      nextColumns[sourceColumnIndex] = updatedColumn;

      setColumns(nextColumns);

      void syncColumnItemsToApi(updatedColumn);

      return;
    }

    const sourceItems = [...sourceColumn.items];
    sourceItems.splice(activeItemIndex, 1);

    const targetItems = [...targetColumn.items];

    const overItemIndex = targetItems.findIndex((item) => item.id === overId);

    const insertIndex =
      overItemIndex === -1 ? targetItems.length : overItemIndex;

    const movedItem: KanbanItem =
      activeItemData.type === "task"
        ? {
            ...activeItemData,
            status: targetColumn.id,
            columnId: targetColumn.id,
          }
        : {
            ...activeItemData,
            columnId: targetColumn.id,
          };

    targetItems.splice(insertIndex, 0, movedItem);

    const updatedSourceColumn: Column = {
      ...sourceColumn,
      items: sourceItems,
    };

    const updatedTargetColumn: Column = {
      ...targetColumn,
      items: targetItems,
    };

    nextColumns[sourceColumnIndex] = updatedSourceColumn;
    nextColumns[targetColumnIndex] = updatedTargetColumn;

    setColumns(nextColumns);

    void syncColumnItemsToApi(updatedSourceColumn);
    void syncColumnItemsToApi(updatedTargetColumn);
  };
  if (loading) {
    return <p className="text-slate-500">Loading board...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }
  return (
    <section className="w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Kanban Board</h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your tasks and notes
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {columns.map((column) => (
            <KanbanColumn key={column.id} column={column} />
          ))}
        </div>

        <DragOverlay>
          {activeItem ? (
            activeItem.type === "task" ? (
              <TaskCard task={activeItem} />
            ) : (
              <NoteCard note={activeItem} />
            )
          ) : null}
        </DragOverlay>
      </DndContext>
    </section>
  );
}
