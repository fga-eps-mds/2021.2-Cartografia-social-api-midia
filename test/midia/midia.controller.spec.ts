import { Test } from '@nestjs/testing';
import { Cloudinary } from '../../src/cloudinary/cloudinary';
import { MidiaController } from '../../src/midia/midia.controller';
import { MidiaService } from '../../src/midia/midia.service';

describe('MidiaController', () => {
  let controller: MidiaController;

  const customModule = async (fn: any) => {
    return Test.createTestingModule({
      providers: [
        {
          provide: MidiaService,
          useValue: fn,
        },
        {
          provide: Cloudinary,
          useValue: jest.fn(),
        },
      ],
      controllers: [MidiaController],
    }).compile();
  };

  it('should be defined', async () => {
    const module = await customModule(jest.fn());

    controller = module.get<MidiaController>(MidiaController);
    expect(controller).toBeDefined();
  });

  it('should test controller midia upload request', async () => {
    const data = {
      bufferB64: Buffer.from('U3RyaW5nIGRlIHRlc3Rl', 'base64'),
      file: {
        fieldname: 'images',
        originalname: 'images',
        encoding: 'UTF-8',
        mimetype: 'asdfg',
        size: 5978,
        stream: null,
        destination:
          'http://res.cloudinary.com/nova-cartografia-social/image/upload/v1632082302/ixnhlev1gtysbsyrslcr.png',
        filename: 'images',
        path: '.',
        buffer: Buffer.from('U3RyaW5nIGRlIHRlc3Rl', 'base64'),
      },
    };

    const response = {
      asset_id: '33610a855094174e098674cd9d114f75',
      public_id: 'ixnhlev1gtysbsyrslcr',
      version: 1632082302,
      version_id: 'd434e9e8d466101e106e6712f9c8fd0c',
      signature: '4992a942ac5989de65b707fd34decc6f3497ac98',
      width: 228,
      height: 221,
      format: 'png',
      resource_type: 'image',
      created_at: '2021-09-19T20:11:42Z',
      tags: [],
      bytes: 5978,
      type: 'upload',
      etag: '3f785a6c7247468eaa44e431f3cf70c0',
      placeholder: false,
      url: 'http://res.cloudinary.com/nova-cartografia-social/image/upload/v1632082302/ixnhlev1gtysbsyrslcr.png',
      secure_url:
        'https://res.cloudinary.com/nova-cartografia-social/image/upload/v1632082302/ixnhlev1gtysbsyrslcr.png',
      original_filename: 'file',
      api_key: '156751358469945',
    };

    const module = await customModule({
      create: () => response,
    });

    controller = module.get<MidiaController>(MidiaController);

    expect(await controller.uploadFile(data)).toStrictEqual(response);
  });

  it('should test controller midia delete request', async () => {
    const fileId = 'ixnhlev1gtysbsyrslcr';

    const module = await customModule({
      remove: () =>
        Promise.resolve({
          result: 'ok',
        }),
    });

    controller = module.get<MidiaController>(MidiaController);

    expect(await controller.remove(fileId)).toStrictEqual({ result: 'ok' });
  });

  it('should get file url', async () => {
    const url =
      'http://res.cloudinary.com/nova-cartografia-social/image/upload/v1632082302/ixnhlev1gtysbsyrslcr.png';

    const fileId = 'ixnhlev1gtysbsyrslcr';

    const module = await customModule({
      getFileUrl: () => url,
    });

    controller = module.get<MidiaController>(MidiaController);

    expect(await controller.getUrl(fileId)).toStrictEqual(url);
  });
});
