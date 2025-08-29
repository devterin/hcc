import { IsString } from "class-validator";

export class UpdateServiceDto {
    @IsString()
    name?: string;

    @IsString()
    description?: string;
}