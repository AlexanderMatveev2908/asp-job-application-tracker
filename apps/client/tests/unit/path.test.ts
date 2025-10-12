import { describe, it, expect } from 'vitest';
import { LinksSvc } from '../../src/core/ui_factory/links';

describe('path match', () => {
  it('0. should match simple equality', () => {
    expect(LinksSvc.isCurrPath('/abc', '/abc')).toBe(true);
  });

  it('1. should match with a trailing slash in path & query in href', () => {
    expect(LinksSvc.isCurrPath('/abc/', '/abc?x=123')).toBe(true);
  });

  it('2. should match with query in path & trailing slash in href', () => {
    expect(LinksSvc.isCurrPath('/abc?x=123', '/abc//')).toBe(true);
  });

  it('3. should fail simple inequality', () => {
    expect(LinksSvc.isCurrPath('/abc', '/zxy')).toBe(false);
  });

  it('4. should fail sub paths', () => {
    expect(LinksSvc.isCurrPath('/abc', '/abc/subpath')).toBe(false);
  });
});
