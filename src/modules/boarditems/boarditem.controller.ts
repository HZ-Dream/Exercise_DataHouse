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

import { BoardItemService } from './boarditem.service';
import { ResponseData } from '../../global/globalClass';
import { HttpMessage, HttpStatus } from '../../global/globalEnum';
import { BoardItem } from '../../models/boarditem.model';
import { BoardItemDto } from '../../dto/boarditem.dto';

@Controller('board_items')
export class BoardItemController {
    constructor(
        private readonly boardItemService: BoardItemService,
    ) {}

    @Get()
    async getBoardItems(): Promise<ResponseData<BoardItem[]>> {
        try {
            const items = await this.boardItemService.getBoardItems();

            return new ResponseData<BoardItem[]>(
                items,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );
        } catch (error) {
            return new ResponseData<BoardItem[]>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    @Post()
    async createItem(
        @Body() boardItemDto: BoardItemDto,
    ): Promise<ResponseData<BoardItem>> {

        try {
            const item =
                await this.boardItemService.createItem(boardItemDto);

            return new ResponseData<BoardItem>(
                item,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );

        } catch (error) {
            console.log(error);
            
            return new ResponseData<BoardItem>(
                [],
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    @Get(':id')
    async detailItem(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseData<BoardItem | null>> {

        try {
            const product =
                await this.boardItemService.detailItem(id);

            return new ResponseData<BoardItem | null>(
                product,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );

        } catch (error) {

            return new ResponseData<BoardItem | null>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    @Put(':id')
    async updateItem(
        @Param('id', ParseIntPipe) id: number,
        @Body() boardItemDto: Partial<BoardItemDto>,
    ): Promise<ResponseData<BoardItem | null>> {

        try {
            const product =
                await this.boardItemService.updateItem(id, boardItemDto);

            return new ResponseData<BoardItem | null>(
                product,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );

        } catch (error) {

            return new ResponseData<BoardItem | null>(
                null,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }

    @Delete(':id')
    async deleteItem(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseData<boolean>> {

        try {
            await this.boardItemService.deleteItem(id);

            return new ResponseData<boolean>(
                true,
                HttpStatus.SUCCESS,
                HttpMessage.SUCCESS,
            );

        } catch (error) {

            return new ResponseData<boolean>(
                false,
                HttpStatus.ERROR,
                HttpMessage.ERROR,
            );
        }
    }
}