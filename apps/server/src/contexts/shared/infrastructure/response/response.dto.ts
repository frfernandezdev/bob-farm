import { HttpStatus } from "@nestjs/common";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose, plainToInstance } from "class-transformer";

export class ResponseDTO {
  @ApiProperty({
    enum: HttpStatus,
  })
  @Expose()
  readonly statusCode?: HttpStatus;

  @ApiProperty()
  @Expose()
  readonly path?: string;

  @ApiProperty()
  @Expose()
  readonly timestamp?: number;

  @ApiPropertyOptional()
  @Expose()
  readonly error?: string;

  public static make<T>(payload: { [key: string]: any }): T {
    return plainToInstance(this, payload) as T;
  }
}
