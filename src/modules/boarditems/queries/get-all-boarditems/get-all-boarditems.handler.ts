import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetAllBoardItemsQuery } from './get-all-boarditems.query';
import { BoardItem } from '../../boarditem.entity';

@QueryHandler(GetAllBoardItemsQuery)
export class GetAllBoardItemsHandler implements IQueryHandler<GetAllBoardItemsQuery> {
  constructor(
    @InjectRepository(BoardItem)
    private boardItemRepository: Repository<BoardItem>,
  ) {}

  async execute(query: GetAllBoardItemsQuery): Promise<BoardItem[]> {
    return await this.boardItemRepository.find();
  }
}