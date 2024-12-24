import { CallHandler, Injectable, NestInterceptor } from "@nestjs/common";
import { ExecutionContext } from "@nestjs/common/interfaces/features/execution-context.interface";
import { Request, Response } from "express";
import { map, Observable } from "rxjs";

interface GenericObject {
  [key: string]: any;
}

export interface CustomResponse {
  statusCode: number;
  path: string;
  timestamp: number;
  count?: number;
  total?: number;
  result?: GenericObject | GenericObject[];
}

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<CustomResponse> {
    return next.handle().pipe(map(this.makeResponse(context)));
  }

  private setHeader(context: ExecutionContext, data: CustomResponse) {
    const httpRequest: Request = context.switchToHttp().getRequest();
    const httpResponse: Response = context.switchToHttp().getResponse();

    data["statusCode"] = httpResponse.statusCode;
    data["path"] = httpRequest.path;
    data["timestamp"] = Date.now();
  }

  makeResponse(context: ExecutionContext) {
    const handler = (data: CustomResponse) => {
      this.setHeader(context, data);

      return data;
    };
    return handler;
  }
}
