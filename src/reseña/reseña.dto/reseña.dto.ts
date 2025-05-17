/* eslint-disable prettier/prettier */
import { IsEmpty, IsNumber, IsString } from "class-validator";

export class ReseñaDto {
    @IsString()
    @IsEmpty()
    readonly comentario: string;
    
    @IsNumber()
    @IsEmpty()
    readonly alificacion: number;
    
    @IsString()
    @IsEmpty()
    readonly fecha: string;

}
