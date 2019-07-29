import { IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class SmsDto {
    @IsNotEmpty()
    from: string;

    @IsPhoneNumber('ZZ')
    to: string;

    @IsNotEmpty()
    text: string;
}
