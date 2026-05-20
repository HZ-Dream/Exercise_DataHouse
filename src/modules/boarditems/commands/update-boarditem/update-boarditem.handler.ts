import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateBoardItemCommand } from './update-boarditem.command';
import { BoardItem } from '../../boarditem.entity';
import { NotFoundException } from '@nestjs/common';

@CommandHandler(UpdateBoardItemCommand)
export class UpdateBoardItemHandler implements ICommandHandler<UpdateBoardItemCommand> {
  constructor(
    @InjectRepository(BoardItem)
    private boardItemRepository: Repository<BoardItem>,
  ) {}

  async execute(command: UpdateBoardItemCommand): Promise<BoardItem> {
    const boardItem = await this.boardItemRepository.findOne({ where: { id: command.id }})

    if(!boardItem) {
      throw new NotFoundException(`Item with ID ${command.id} not found`);
    }

    Object.assign(boardItem, command.dto);

    return await this.boardItemRepository.save(boardItem);
  }
}