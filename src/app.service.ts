import { Injectable } from '@nestjs/common';

import { sleep } from '@/utils';

@Injectable()
export class AppService {
  getHello(): string {
    sleep(3);
    return 'Hello World!';
  }
}
