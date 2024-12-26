import { ApiResponseProperty } from "@nestjs/swagger";
import { Expose, Type } from "class-transformer";

import { ResponsePaginatorDTO } from "@/src/contexts/shared/infrastructure/response/paginator.dto";
import { ResponseDTO } from "@/src/contexts/shared/infrastructure/response/response.dto";

export class PurchaseResponse {
}

export class PurchaseResponseDTO extends ResponseDTO {
  @ApiResponseProperty({
    type: PurchaseResponse,
  })
  @Type(() => PurchaseResponse)
  @Expose()
  readonly result?: PurchaseResponse[];
}

export class PurchaseResponsePaginatorDTO extends ResponsePaginatorDTO {
  @ApiResponseProperty({
    type: [PurchaseResponse],
  })
  @Type(() => PurchaseResponse)
  @Expose()
  readonly results?: PurchaseResponse[];
}
