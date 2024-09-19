import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, any> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const statusCode = context.switchToHttp().getResponse().statusCode;
        if (typeof data === "string") {
          // in the case of being coverting image to base64 @Post("imagetobase64")
          return {
            statusCode,
            base64: data,
          };
        }
        return {
          statusCode,
          ...data,
        };
      })
    );
  }
}
