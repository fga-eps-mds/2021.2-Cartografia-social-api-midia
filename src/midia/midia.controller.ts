import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MidiaService } from './midia.service';
import { CreateMidiaDto } from './dto/create-midia.dto';
import { UpdateMidiaDto } from './dto/update-midia.dto';

@Controller()
export class MidiaController {
  constructor(private readonly midiaService: MidiaService) {}

  @MessagePattern('createMidia')
  create(@Payload() createMidiaDto: CreateMidiaDto) {
    return this.midiaService.create(createMidiaDto);
  }

  @MessagePattern('findAllMidia')
  findAll() {
    return this.midiaService.findAll();
  }

  @MessagePattern('findOneMidia')
  findOne(@Payload() id: number) {
    return this.midiaService.findOne(id);
  }

  @MessagePattern('updateMidia')
  update(@Payload() updateMidiaDto: UpdateMidiaDto) {
    return this.midiaService.update(updateMidiaDto.id, updateMidiaDto);
  }

  @MessagePattern('removeMidia')
  remove(@Payload() id: number) {
    return this.midiaService.remove(id);
  }
}
