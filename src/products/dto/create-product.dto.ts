import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
    @IsString()    
    @IsNotEmpty()
    name: string;

    @IsString()
    description?: string;
    
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    category?: string;

    @IsString()
    image?: string;

    @IsString()
    @IsNotEmpty()
    barCode: string;

    @IsString()
    size?: string;
}
