import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import { PdfToolbar } from './toolbar';
import { PdfTestingAdapterProvider } from '../../adapters/testing';

describe('Toolbar', () => {
  it('Toolbar should render div with children', () => {
    const result = render(
      <PdfTestingAdapterProvider>
        <PdfToolbar />
      </PdfTestingAdapterProvider>,
    );

    const divElem = document.querySelector('div') as HTMLDivElement;
    expect(divElem).toBeDefined();
    result.unmount();
  });

  it('dismisses side dropdowns on selection, outside click, and Escape', () => {
    const select = jest.fn();
    const result = render(
      <PdfTestingAdapterProvider>
        <PdfToolbar
          fileItems={<button onClick={select}>Custom action</button>}
        />
      </PdfTestingAdapterProvider>,
    );
    const tools = result.getByRole('button', { name: 'Tools' });
    const actions = result.getByRole('button', { name: 'Actions' });

    fireEvent.click(tools);
    expect(tools).toHaveAttribute('aria-expanded', 'true');
    fireEvent.pointerDown(actions);
    fireEvent.click(actions);
    expect(tools).toHaveAttribute('aria-expanded', 'false');
    expect(actions).toHaveAttribute('aria-expanded', 'true');
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(actions).toHaveAttribute('aria-expanded', 'false');
    expect(actions).toHaveFocus();

    fireEvent.click(actions);
    fireEvent.click(result.getByRole('button', { name: 'Custom action' }));
    expect(select).toHaveBeenCalledTimes(1);
    expect(actions).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(tools);
    fireEvent.pointerDown(document.body);
    expect(tools).toHaveAttribute('aria-expanded', 'false');
    result.unmount();
  });
});
