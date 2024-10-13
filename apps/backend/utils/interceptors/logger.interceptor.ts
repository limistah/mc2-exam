import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError, tap } from 'rxjs';
import { LoggerService } from 'src/components/logging';
import { LOG_OPERATION_STATUS } from 'utils/logging.constants';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private loggerService: LoggerService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const startTime = Date.now();

    const methodName = context.getHandler().name;
    const className = context.getClass().name;
    const request = context.switchToHttp().getRequest();
    const url = request.url;
    const method = request.method;
    return next.handle().pipe(
      //TODO:  Need to filter some data being passed in request bodies and not log them
      tap((data: any) =>
        this.loggerService.info({
          data: ` ${method} -- ${url} -- Response completed: ${
            Date.now() - startTime
          }ms`,
          name: `${className} -- ${methodName}`,
          status: LOG_OPERATION_STATUS.SUCCESSFUL,
          context: data,
        }),
      ),
      catchError((err: any) => {
        this.loggerService.error({
          error: `${url} ${err} ${err} -- Response completed: ${
            Date.now() - startTime
          }ms`,
          name: `${className} -- ${methodName}`,
          code: HttpStatus.BAD_REQUEST,
        });
        throw err; // throwing it for the client
      }),
    );
  }
}
