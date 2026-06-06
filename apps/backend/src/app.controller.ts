import { Controller, Get } from '@nestjs/common';

@Controller('/api')
export class AppController {
  @Get()
  getRootRoute() {
    return { message: 'Welcome to Ibex WhatsApp Sales Agent API!' };
  }
}