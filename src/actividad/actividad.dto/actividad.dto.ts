/* eslint-disable prettier/prettier */
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ActividadDto {
        @IsString()
        @IsNotEmpty()
        titulo: string;
    
        @IsString()
        @IsNotEmpty()
        fecha: string;
    
        @IsNumber()
        @IsNotEmpty()
        cupoMaximo: number;
    
        @IsNumber()
        @IsNotEmpty()
        estado: number;
}
