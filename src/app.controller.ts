import { Controller, Post, Body } from '@nestjs/common';
import { SmsDto } from './sms.dto';

@Controller()
export class AppController {
  @Post('/sms/json')
  sendSms(
    @Body() smsDto: SmsDto,
  ): string {
    console.log('Received request to send SMS', smsDto);
    return 'Thanks!';
  }
}
