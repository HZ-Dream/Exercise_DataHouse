import { BoardItemDto } from '../../../../dto/boarditem.dto'; 

export class UpdateBoardItemCommand {
  constructor(
    public readonly id: number,
    public readonly dto: BoardItemDto
  ) {}
}