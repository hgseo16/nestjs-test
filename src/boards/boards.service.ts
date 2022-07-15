import { v1 as uuid } from 'uuid';

import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './board.model'
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Board[] = [];

    getAllBoards(): Board[] {
        return this.boards
    }

    createBoard(CreateBoardDto: CreateBoardDto): Board {
        // const title = CreateBoardDto.title
        // const description = CreateBoardDto.description

        const { title, description } = CreateBoardDto

        const board: Board = {
            id: uuid(),
            title,
            description,
            status: BoardStatus.PRIVATE
        }
        this.boards.push(board)
        return board;
    }

    getBoardById(id: string): Board {
        const found = this.boards.find((b) => b.id === id)

        if (!found) {
            throw new NotFoundException()
        }

        return found
    }

    deleteBoard(id: string): void {
        const found = this.getBoardById(id)
        this.boards = this.boards.filter((b) => b.id !== found.id)
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const found = this.getBoardById(id)
        // const result = this.boards.map((b) => )
        return new Board()
    }
}
