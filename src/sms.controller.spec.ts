import { Test } from '@nestjs/testing';
import { SmsModule } from './sms.module';
import { SmsController } from './sms.controller';

describe('SmsController', () => {
  let smsController: SmsController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
        imports: [SmsModule],
    }).compile();

    smsController = module.get<SmsController>(SmsController);
  });

  describe('list', () => {
    it('should return the aggregated cost of messages', async () => {
        // Send 3 messages
        const messages = [1, 2, 3].map(() => ({ from: 'Birdie', to: '+447427287918', text: 'Hello World!'}));
        await messages.forEach(async (message) => await smsController.sendSms(message));

        expect(await smsController.getCost()).toEqual(1.5);
    });
  });
});