import { Module } from '@nestjs/common';
import { MidiaService } from './midia.service';
import { MidiaController } from './midia.controller';
import { ConfigService } from 'src/config/configuration';
import { Cloudinary } from 'src/cloudinary/cloudinary';

@Module({
  controllers: [MidiaController],
  providers: [
    MidiaService,
    Cloudinary,
    {
      provide: 'CONFIG',
      useClass: ConfigService,
    },
  ],
})
export class MidiaModule {}
