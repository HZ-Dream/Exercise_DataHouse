import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardItemCommand } from './create-boarditem.command';
import { BoardItem } from '../../boarditem.entity';

@CommandHandler(CreateBoardItemCommand)
export class CreateBoardItemHandler implements ICommandHandler<CreateBoardItemCommand> {
  constructor(
    @InjectRepository(BoardItem)
    private boardItemRepository: Repository<BoardItem>,
  ) {}

  async execute(command: CreateBoardItemCommand): Promise<BoardItem> {
    const newProduct = this.boardItemRepository.create(command.dto);

    return await this.boardItemRepository.save(newProduct);
  }
}