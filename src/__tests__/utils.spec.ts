import { cn } from '@/lib/utils';

describe('cn utility function', () => {
  it('returns a single class name correctly', () => {
    expect(cn('class1')).toBe('class1');
  });

  it('merges multiple class names correctly', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('handles conditional class names correctly', () => {
    expect(cn('class1', false && 'class2', 'class3')).toBe('class1 class3');
  });

  it('handles Tailwind conflicting classes correctly', () => {
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
  });

  it('handles empty inputs gracefully', () => {
    expect(cn()).toBe('');
  });

  it('handles null and undefined inputs', () => {
    expect(cn(null, undefined, 'class1')).toBe('class1');
  });

  it('handles an array of class values', () => {
    expect(cn(['class1', 'class2'])).toBe('class1 class2');
  });
});
