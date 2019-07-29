import { Module, HttpModule } from '@nestjs/common';
import { SmsController } from './sms.controller';
import { PricingService } from './pricing.service';

@Module({
  imports: [HttpModule],
  controllers: [SmsController],
  providers: [PricingService],
})
export class SmsModule {}
