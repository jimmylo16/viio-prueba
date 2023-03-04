import { Controller, Get } from '@nestjs/common';
import { StatusService } from './status.service';

@Controller()
export class AppController {
  constructor(private readonly appService: StatusService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
