import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { SmsDto } from './sms.dto';

@Controller()
export class AppController {
  @Post('/sms/json')
  sendSms(
    @Body(ValidationPipe) smsDto: SmsDto,
  ): string {
    console.log('Received request to send SMS', smsDto);
    return 'Thanks!';
  }
}
