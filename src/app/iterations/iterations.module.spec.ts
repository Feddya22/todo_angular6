import { IterationsModule } from './iterations.module';

describe('IterationsModule', () => {
  let iterationsModule: IterationsModule;

  beforeEach(() => {
    iterationsModule = new IterationsModule();
  });

  it('should create an instance', () => {
    expect(iterationsModule).toBeTruthy();
  });
});
