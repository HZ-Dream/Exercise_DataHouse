export class BoardItem {
    id?: number;

    type?: string;
    columnId?: string;

    order?: number;

    variant?: string;
    status?: string;

    title?: string;
    description?: string;

    bullets?: string[];

    date?: string;
    emoji?: string;

    assignees?: string[];

    color?: string;
    content?: string;

    constructor({
        id,
        type,
        columnId,
        order,
        variant,
        status,
        title,
        description,
        bullets,
        date,
        emoji,
        assignees,
        color,
        content,
    }: Partial<BoardItem>) {

        if (id !== null && id !== undefined)
            this.id = id;

        if (type !== null && type !== undefined)
            this.type = type;

        if (columnId !== null && columnId !== undefined)
            this.columnId = columnId;

        if (order !== null && order !== undefined)
            this.order = order;

        if (variant !== null && variant !== undefined)
            this.variant = variant;

        if (status !== null && status !== undefined)
            this.status = status;

        if (title !== null && title !== undefined)
            this.title = title;

        if (description !== null && description !== undefined)
            this.description = description;

        if (bullets !== null && bullets !== undefined)
            this.bullets = bullets;

        if (date !== null && date !== undefined)
            this.date = date;

        if (emoji !== null && emoji !== undefined)
            this.emoji = emoji;

        if (assignees !== null && assignees !== undefined)
            this.assignees = assignees;

        if (color !== null && color !== undefined)
            this.color = color;

        if (content !== null && content !== undefined)
            this.content = content;
    }
}