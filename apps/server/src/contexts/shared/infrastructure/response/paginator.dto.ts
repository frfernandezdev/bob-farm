import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

import { ResponseDTO } from "./response.dto";

export class ResponsePaginatorDTO extends ResponseDTO {
  @ApiProperty()
  @Expose()
  readonly count?: number;

  @ApiProperty()
  @Expose()
  readonly total?: number;
}
