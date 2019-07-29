import { Controller, Post, Body, ValidationPipe, Render, Get, UseGuards } from '@nestjs/common';
import { SmsDto } from './sms.dto';
import { SmsMessage } from './sms.entity';
import { BasicAuthStrategy } from './basic.guard';
import { PricingService } from './pricing.service';

@Controller('sms')
export class SmsController {
  private messages: SmsMessage[];
  
  constructor(private readonly pricingService: PricingService) {
    this.messages = [];
  }

  @Get('list')
  @Render('list')
  @UseGuards(BasicAuthStrategy)
  async list() {
    const amountSaved = await this.pricingService.getAggregateCost(this.messages.map(message => message.to));

    return {
      messages: this.messages,
      amountSaved: amountSaved.toFixed(2),
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
