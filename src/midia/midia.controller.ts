import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { MidiaService } from './midia.service';
import { ReceiveFileDto } from './dto/receiveFile.dto';

@Controller()
export class MidiaController {
  constructor(private readonly midiaService: MidiaService) {}

  @MessagePattern('uploadMidia')
  async uploadFile(receivedFile: any) {
    const decodedFile = new ReceiveFileDto(receivedFile);

    return this.midiaService.create(decodedFile.file);
  }

  @MessagePattern('removeMidia')
  remove(file: any) {
    return this.midiaService.remove(file.id);
  }

  @MessagePattern('getUrl')
  getUrl(id: string) {
    return this.midiaService.getFileUrl(id);
  }
}
