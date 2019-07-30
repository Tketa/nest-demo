import { Test } from '@nestjs/testing';
import { SmsModule } from './sms.module';
import { SmsController } from './sms.controller';
import { PricingService, IPricingService } from './pricing.service';

class MockPricingService implements IPricingService {
    getCost(phoneNumber: string): Promise<number> {
        return Promise.resolve(0.5);
    }

    async getAggregateCost(phoneNumbers: string[]): Promise<number> {
        const costs = await Promise.all(phoneNumbers.map(phoneNumber => this.getCost(phoneNumber)));
        return costs.reduce((acc, cost) => acc + cost, 0.0);
    }

}

describe('SmsController', () => {
  let smsController: SmsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
        imports: [SmsModule],
    })
    .overrideProvider(PricingService)
    .useClass(MockPricingService)
    .compile();

    smsController = module.get<SmsController>(SmsController);
  });

  describe('list', () => {
    it('should return the aggregated cost of messages', async () => {
        // Send 3 messages
        const messages = [1, 2, 3].map(() => ({ from: 'Birdie', to: '+447427287918', text: 'Hello World!'}));
        await messages.forEach(async (message) => await smsController.sendSms(message));

        expect(await smsController.getCost()).toEqual('1.50');
    });
  });
});