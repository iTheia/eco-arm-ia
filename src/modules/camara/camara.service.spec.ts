import { Test, TestingModule } from '@nestjs/testing';
import { CamaraService } from './camara.service';

describe('CamaraService', () => {
  let service: CamaraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CamaraService],
    }).compile();

    service = module.get<CamaraService>(CamaraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
