import { IsOptional, IsString } from "class-validator";

export class CreateCounterDto {
    @IsString()
    name?: string

    @IsOptional()
    serviceIds?: number[]
}