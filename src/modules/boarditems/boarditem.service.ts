import { Injectable } from '@nestjs/common';
import { BoardItem } from '../../models/boarditem.model';
import { BoardItemDto } from '../../dto/boarditem.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BoardItemService {

    constructor(
        @InjectRepository(BoardItem)
        private readonly boardItemRepository: Repository<BoardItem>,
    ) {}

    async getBoardItems(): Promise<BoardItem[]> {
        return await this.boardItemRepository.find();
    }

    async createItem(
        boardItemDto: BoardItemDto,
    ): Promise<BoardItem> {

        const item = this.boardItemRepository.create(boardItemDto);

        return await this.boardItemRepository.save(item);
    }

    async detailItem(
        id: number,
    ): Promise<BoardItem | null> {

        return await this.boardItemRepository.findOne({
            where: { id },
        });
    }


    async updateItem(
        id: number,
        boardItemDto: Partial<BoardItemDto>,
    ): Promise<BoardItem | null> {
        const existing = await this.detailItem(id)
        if (!existing) return null

        const merged = this.boardItemRepository.merge(existing, boardItemDto)
        return await this.boardItemRepository.save(merged)
    }

    async deleteItem(id: number): Promise<void> {
        await this.boardItemRepository.delete(id);
    }
}