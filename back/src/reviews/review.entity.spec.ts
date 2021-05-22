import { Review } from './review.entity';

describe('ReviewEntity', () => {
  it('should be defined', () => {
    expect(new Review()).toBeDefined();
  });
});
