import React from 'react';
import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { Button, Select, Toolbar } from './components';

describe('UI', () => {
  it('Button should render button with label', () => {
    const result = render(<Button aria-label="test" />);

    const buttonElem = document.querySelector('button') as HTMLButtonElement;
    expect(buttonElem).toBeDefined();

    result.unmount();
  });

  it('Toolbar should render div with children', () => {
    const result = render(<Toolbar />);

    const divElem = document.querySelector('div') as HTMLDivElement;
    expect(divElem).toBeDefined();
    result.unmount();
  });

  it('Select should render select with options', () => {
    const options = [
      { value: '0', label: 'option 0' },
      { value: '1', label: 'option 1' },
    ];
    const result = render(<Select options={options} />);

    const selectElem = document.querySelector('select') as HTMLSelectElement;
    expect(selectElem).toBeDefined();

    const optionElems = document.querySelectorAll('option');
    expect(optionElems.length).toEqual(2);

    optionElems.forEach((optionElem, index) => {
      expect(optionElem.getAttribute('value')).toEqual(options[index].value);
      expect(optionElem.textContent).toEqual(options[index].label);
    });

    result.unmount();
  });
});
