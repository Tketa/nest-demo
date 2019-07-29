import { Controller, Post, Body, ValidationPipe, Render, Get } from '@nestjs/common';
import { SmsDto } from './sms.dto';
import { SmsMessage } from './sms.entity';

@Controller()
export class AppController {
  private messages: SmsMessage[];
  constructor() {
    this.messages = [];
  }
  @Get('/sms/list')
  @Render('list')
  async list() {
    return {
      messages: this.messages,
    };
  }

  @Post('/sms/json')
  sendSms(
    @Body(ValidationPipe) smsDto: SmsDto,
  ): string {
    const { from, to, text } = smsDto;
    this.messages.push(new SmsMessage(from, to, text));
    return 'Thanks!';
  }
}
