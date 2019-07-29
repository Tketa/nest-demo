export class SmsMessage {
    timestamp: Date;

    constructor(
        private readonly from: string,
        private readonly to: string,
        private readonly text: string,
    ) {
        this.timestamp = new Date();
    }
}