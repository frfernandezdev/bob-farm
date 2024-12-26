import { Injectable } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

@Injectable()
export class CustomThrottlerGuard extends ThrottlerGuard {
  protected async getTracker(req: Record<string, any>): Promise<string> {
    const authHeader = req.headers['authorization'];
    const tokenPart = authHeader ? authHeader.split(' ')[1] : 'no-token';
    return `${req.ip}-${tokenPart}`;
  }
}
