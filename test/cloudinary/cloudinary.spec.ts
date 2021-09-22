import { Test } from '@nestjs/testing';
import { Cloudinary } from '../../src/cloudinary/cloudinary';
import { ConfigService } from '../../src/config/configuration';

describe('Cloudinary', () => {
  let helper: Cloudinary;

  const customModule = async () => {
    return Test.createTestingModule({
      providers: [
        Cloudinary,
        {
          provide: 'CONFIG',
          useClass: ConfigService,
        },
      ],
    }).compile();
  };

  it('should be defined', async () => {
    const module = await customModule();

    helper = module.get<Cloudinary>(Cloudinary);
    expect(helper).toBeDefined();
  });
});
