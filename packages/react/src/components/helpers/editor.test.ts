import { PdfAnnotationObject } from '@unionpdf/models';
import { Operation } from '../editor/editor.context';
import { apply } from './editor';

describe('apply', () => {
  it('should create annotation when applying create operation', () => {
    const annotations: PdfAnnotationObject[] = [];
    const operations: Operation[] = [
      {
        id: '0',
        action: 'create',
        annotation: {} as PdfAnnotationObject,
      },
    ];

    const result = apply(annotations, operations);
    expect(result.length).toBe(1);
    expect(result[0]).toStrictEqual({});
  });
});
