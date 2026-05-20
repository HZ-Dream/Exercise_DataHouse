import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DeleteBoardItemCommand } from './delete-boarditem.command';
import { BoardItem } from '../../boarditem.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(DeleteBoardItemCommand)
export class DeleteBoardItemHandler implements ICommandHandler<DeleteBoardItemCommand> {
  constructor(
    @InjectRepository(BoardItem)
    private boardItemRepository: Repository<BoardItem>,
  ) {}

  async execute(command: DeleteBoardItemCommand): Promise<boolean> {
    const { id } = command;

    const boardItem = await this.boardItemRepository.findOne({ where: { id } });

    if (!boardItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    await this.boardItemRepository.delete(id);
    
    return true;
  }
}