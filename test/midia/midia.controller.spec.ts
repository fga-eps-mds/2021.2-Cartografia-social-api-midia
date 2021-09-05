import { Test, TestingModule } from '@nestjs/testing';
import { MidiaController } from '../../src/midia/midia.controller';
import { MidiaService } from '../../src/midia/midia.service';

describe('MidiaController', () => {
  let controller: MidiaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MidiaController],
      providers: [MidiaService],
    }).compile();

    controller = module.get<MidiaController>(MidiaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
