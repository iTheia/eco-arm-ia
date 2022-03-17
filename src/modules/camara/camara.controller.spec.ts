import { Test, TestingModule } from '@nestjs/testing';
import { CamaraController } from './camara.controller';

describe('CamaraController', () => {
  let controller: CamaraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CamaraController],
    }).compile();

    controller = module.get<CamaraController>(CamaraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
