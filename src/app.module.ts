import { Module } from '@nestjs/common';
import { MidiaModule } from './midia/midia.module';
import { Cloudinary } from './cloudinary/cloudinary';
import { ConfigService } from './config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MidiaModule],
  providers: [ConfigService],
})
export class AppModule { }
