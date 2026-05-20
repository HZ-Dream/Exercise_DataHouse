import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardItemController } from './boarditem.controller';
import { BoardItem } from './boarditem.entity';
import { CqrsModule } from '@nestjs/cqrs';

// Query
import { GetAllBoardItemsHandler } from './queries/get-all-boarditems/get-all-boarditems.handler';
import { GetDetailBoardItemHandler } from './queries/get-detail-boarditem/get-detail-boarditem.handler';

// Command
import { CreateBoardItemHandler } from './commands/create-boarditem/create-boarditem.handler';
import { UpdateBoardItemHandler } from './commands/update-boarditem/update-boarditem.handler';
import { DeleteBoardItemHandler } from './commands/delete-boarditem/delete-boarditem.handler';

export const CommandHandlers = [CreateBoardItemHandler, UpdateBoardItemHandler, DeleteBoardItemHandler];
export const QueryHandlers = [GetAllBoardItemsHandler, GetDetailBoardItemHandler];

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardItem]),
    CqrsModule,
  ],
  controllers: [BoardItemController],
  providers: [
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class BoardItemModule {}