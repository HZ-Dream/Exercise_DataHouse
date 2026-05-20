import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GetDetailBoardItemQuery } from './get-detail-boarditem.query';
import { BoardItem } from '../../boarditem.entity';
import { NotFoundException } from '@nestjs/common';

@QueryHandler(GetDetailBoardItemQuery)
export class GetDetailBoardItemHandler implements IQueryHandler<GetDetailBoardItemQuery> {
  constructor(
    @InjectRepository(BoardItem)
    private boardItemRepository: Repository<BoardItem>,
  ) {}

  async execute(query: GetDetailBoardItemQuery): Promise<BoardItem> {
    const { id } = query;
    const item = await this.boardItemRepository.findOne({ where: { id }});

    if(!item) {
      throw new NotFoundException(`Board Item with ID ${id} not found`);
    }

    return item;
  }
}