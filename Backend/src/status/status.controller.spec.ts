import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './status.controller';
import { StatusService } from './status.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [StatusService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('Hello World!, Ping To the Server', () => {
      expect(appController.getHello()).toBe('Hello World!, Ping To the Server');
    });
  });
});
