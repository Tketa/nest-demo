import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { SmsModule } from '../src/sms.module';
import { INestApplication } from '@nestjs/common';

describe('SmsController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [SmsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('gets the total amount saved', () => {
    const messages = new Array(10).map(() => ({ from: 'Birdie', to: '+447427287918', text: 'Hello World!'}));
    messages.forEach(async (message) => {
      await request(app.getHttpServer())
        .post('/sms/json')
        .send(message);
    });

    const 
  });
});
