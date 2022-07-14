import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from '../board.model'

export class BoardStatusValidationPipe implements PipeTransform {

    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]

    transform(value: any, metadata: ArgumentMetadata) {

        value = value.toUpperCase();

        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`Status must be 'PRIVATE' or 'PUBLIC`)
        }

        return value;
    }

    private isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status)
        return index !== -1
    }

}

export class TestValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any {
        return value
    }
}