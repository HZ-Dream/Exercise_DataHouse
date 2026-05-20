import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';

import { ResponseData } from '../../global/globalClass';
import { HttpMessage, HttpStatus } from '../../global/globalEnum';
import { BoardItem } from '../../models/boarditem.model';
import { BoardItemDto } from '../../dto/boarditem.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

// Query
import { GetAllBoardItemsQuery } from './queries/get-all-boarditems/get-all-boarditems.query';
import { GetDetailBoardItemQuery } from './queries/get-detail-boarditem/get-detail-boarditem.query';
import { CreateBoardItemCommand } from './commands/create-boarditem/create-boarditem.command';
import { UpdateBoardItemCommand } from './commands/update-boarditem/update-boarditem.command';
import { DeleteBoardItemCommand } from './commands/delete-boarditem/delete-boarditem.command';

@Controller('board_items')
export class BoardItemController {
    // Inject CommandBus & QueryBus
    constructor(
        private readonly queryBus: QueryBus,
        private readonly commandBus: CommandBus,
    ) {}

    // Query
    @Get()
    async getAllBoardItems() {
        return await this.queryBus.execute(new GetAllBoardItemsQuery);
    }

    @Get(':id')
    async getDetailBoardItem(
        @Param('id') id: number
    ) {
        return await this.queryBus.execute(new GetDetailBoardItemQuery(id));
    }

    // Command
    @Post()
    async createBoardItem(
        @Body() boardItemDto: BoardItemDto
    ): Promise<ResponseData<BoardItem>> {
        const result = await this.commandBus.execute<CreateBoardItemCommand, BoardItem>(
            new CreateBoardItemCommand(boardItemDto)
        );

        return new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    }

    @Put(':id')
    async updateBoardItem(
        @Param('id') id: number,
        @Body() boardItemDto: BoardItemDto
    ): Promise<ResponseData<BoardItem>> {
        try {            
            const result = await this.commandBus.execute<UpdateBoardItemCommand, BoardItem>(
                new UpdateBoardItemCommand(id, boardItemDto)
            );
    
            return new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.log(error);
            return new ResponseData<BoardItem>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    @Delete(':id')
    async deleteBoardItem(
        @Param('id') id: number
    ): Promise<ResponseData<boolean>> {
        try {            
            await this.commandBus.execute<DeleteBoardItemCommand, BoardItem>(
                new DeleteBoardItemCommand(id)
            );
    
            return new ResponseData(true, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
        } catch (error) {
            console.log(error);
            return new ResponseData(
                false,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }
}