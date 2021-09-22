import { Module } from '@nestjs/common';
import { MidiaModule } from './midia/midia.module';
import { ConfigService } from './config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.cloudinary.env'],
      isGlobal: true,
    }),
    MidiaModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
