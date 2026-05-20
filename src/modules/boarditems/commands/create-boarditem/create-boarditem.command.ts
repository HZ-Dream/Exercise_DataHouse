import { BoardItemDto } from '../../../../dto/boarditem.dto'; 

export class CreateBoardItemCommand {
  constructor(public readonly dto: BoardItemDto) {}
}