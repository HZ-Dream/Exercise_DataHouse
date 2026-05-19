import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BoardItemController } from './boarditem.controller';
import { BoardItemService } from './boarditem.service';
import { BoardItem } from './boarditem.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardItem]),
  ],
  controllers: [BoardItemController],
  providers: [BoardItemService],
})
export class BoardItemModule {}