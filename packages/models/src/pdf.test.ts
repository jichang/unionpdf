import { PdfError } from './pdf';

describe('PdfError', () => {
  test('should contains reason', () => {
    const error = new PdfError('test reason');
    expect(error.reason).toBe('test reason');
  });
});
