import { ApiProperty } from "@nestjs/swagger";
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from "class-validator";

export class RegisterDTO {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsEmail()
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MaxLength(8, {
    message: "Password have max length of 8 characters",
  })
  readonly password: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly role: string;
}
