export class SmsMessage {
    timestamp: Date;

    constructor(
        private readonly from: string,
        public readonly to: string,
        private readonly text: string,
    ) {
        this.timestamp = new Date();
    }
}