import { ApiResponseProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { ResponseDTO } from "@/src/contexts/shared/infrastructure/response/response.dto";

export class AuthResponse {
  @ApiResponseProperty()
  @Expose()
  readonly id: string;

  @ApiResponseProperty()
  @Expose()
  readonly name: string;

  @ApiResponseProperty()
  @Expose()
  readonly email: string;

  @ApiResponseProperty()
  @Expose()
  readonly role: string;

  @ApiResponseProperty()
  @Expose()
  readonly access_token: string;
}

export class AuthResponseDTO extends ResponseDTO {
  @ApiResponseProperty({
    type: AuthResponse,
  })
  @Type(() => AuthResponse)
  @Expose()
  readonly result?: AuthResponse[];
}
