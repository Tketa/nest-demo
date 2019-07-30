import { Injectable, HttpService } from '@nestjs/common';

const NEXMO_BASE_URL = 'http://localhost:3001';

export interface IPricingService {
    getCost(phoneNumber: string): Promise<number>;

    getAggregateCost(phoneNumbers: string[]): Promise<number>;
}

@Injectable()
export class PricingService implements IPricingService {
    constructor(private readonly httpClient: HttpService) {}

    async getCost(phoneNumber: string): Promise<number> {
        const response = await this.httpClient.get(`${NEXMO_BASE_URL}/prices?number=${phoneNumber}`).toPromise();
        return response.data;
    }

    async getAggregateCost(phoneNumbers: string[]): Promise<number> {
        return phoneNumbers.reduce(async (acc, phoneNumber) => {
            const sum = await acc;
            const price = await this.getCost(phoneNumber);
            return sum + price;
          }, Promise.resolve(0.0));
    }
}
