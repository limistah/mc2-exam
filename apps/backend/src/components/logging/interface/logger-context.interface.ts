import { Exclude } from 'class-transformer';

export class LoggerContextInterface {
  data: any;

  constructor(data: any) {
    this.data = data;
  }
}
