import { Module } from '@nestjs/common';
import { MidiaModule } from './midia/midia.module';

@Module({
  imports: [MidiaModule],
})
export class AppModule {}
