import { Controller, Post, Body, ValidationPipe, Render, Get, UseGuards } from '@nestjs/common';
import { SmsDto } from './sms.dto';
import { SmsMessage } from './sms.entity';
import { BasicAuthStrategy } from './basic.guard';

@Controller('sms')
export class AppController {
  private messages: SmsMessage[];
  constructor() {
    this.messages = [];
  }
  @Get('list')
  @Render('list')
  @UseGuards(BasicAuthStrategy)
  async list() {
    return {
      messages: this.messages,
    };
  }

  @Post('json')
  sendSms(
    @Body(ValidationPipe) smsDto: SmsDto,
  ): string {
    const { from, to, text } = smsDto;
    this.messages.push(new SmsMessage(from, to, text));
    return 'Thanks!';
  }
}
