import { IsArray, IsOptional, IsString } from "class-validator";

export class UpdateCounterDto {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsArray()
    serviceIds?: number[];
}