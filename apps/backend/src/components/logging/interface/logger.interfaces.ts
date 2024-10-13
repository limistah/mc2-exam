import { HttpStatus } from '@nestjs/common';
import { LOG_OPERATION_STATUS } from 'utils/logging.constants';

export interface InfoLogObject {
  name: string;
  data?: any;
  status?: LOG_OPERATION_STATUS;
  context?: any;
}

export interface ErrorLogObject {
  error: any;
  code: HttpStatus;
  name?: string;
}

export interface WarnLogObject {
  name: string;
  data: Record<string, any>;
  status?: LOG_OPERATION_STATUS;
}

export interface HttpLogObject {
  name?: string;
  data?: Record<string, any>;
  code: HttpStatus;
  status?: LOG_OPERATION_STATUS.HTTP;
}

export interface DebugLogObject {
  name: string;
  info: Record<string, any> | null;
}
