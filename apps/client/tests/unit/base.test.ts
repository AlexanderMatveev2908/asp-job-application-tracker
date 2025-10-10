import { describe, it, expect } from 'vitest';
import { add } from '../../src/core/lib/math';

describe('Basic math', () => {
  it('should add numbers correctly', () => {
    const result = add(2, 3);
    expect(result).toBe(5);
  });
});
