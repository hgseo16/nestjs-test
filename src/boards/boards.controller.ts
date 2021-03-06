import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common'
import { Board, BoardStatus } from './board.model'
import { BoardsService } from './boards.service'
import { CreateBoardDto } from './dto/create-board.dto'
import { BoardStatusValidationPipe, TestValidationPipe } from './pipes/board-status-validation.pipe'

@Controller('boards')
export class BoardsController {
    constructor(private boardsService: BoardsService) {}

    @Get()
    getAllBoard(): Board[] {
        return this.boardsService.getAllBoards()
    }

    @Post()
    // @UsePipes(ValidationPipe)
    createBoard(@Body() CreateBoardDto: CreateBoardDto): Board {
        return this.boardsService.createBoard(CreateBoardDto); 
    }

    @Get('/:id')
    getBoardById(@Param('id') id: string): Board {
        return this.boardsService.getBoardById(id)
    }

    @Delete('/:id')
    @UsePipes(ValidationPipe)
    deleteBoardById(@Param('id') id: string): void {
        this.boardsService.deleteBoard(id)
    }

    @Patch('/:id/status')
    @UsePipes(TestValidationPipe)
    updateBoardStatus(
        @Param('id') id: string, 
        @Body('status', BoardStatusValidationPipe) status: BoardStatus): Board {
        return this.boardsService.updateBoardStatus(id, status)
    }
}   