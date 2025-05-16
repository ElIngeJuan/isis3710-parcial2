/* eslint-disable prettier/prettier */

import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EstudianteDto {
        @IsNumber()
        @IsNotEmpty()
        numCedula: number;
    
        @IsString()
        @IsNotEmpty()
        nombre: string;
    
        @IsString()
        @IsNotEmpty()
        correo: string;
    
        @IsString()
        @IsNotEmpty()
        programa: string;
    
        @IsNumber()
        @IsNotEmpty()
        semestre: number;
}
