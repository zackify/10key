import React from 'react';
import { Operation, operatorLookup } from './operators';

type Props = {
  operations: Operation[];
};

export const total = (operations: Operation[]) => {
  return operations.reduce((acc, operation) => {
    let number = parseFloat(operation.value);

    if (operation.operator === 'add') {
      return acc + number;
    }
    if (operation.operator === 'multiply') {
      return acc * number;
    }
    if (operation.operator === 'subtract') {
      return acc - number;
    }
    return acc;
  }, 0);
};
export const Output = ({ operations }: Props) => {
  return (
    <div style={{ height: 200, overflow: 'scroll', width: '100%' }}>
      {operations.map((operation, index) => (
        <div
          key={index}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <div>
            ${new Intl.NumberFormat().format(parseFloat(operation.value))}
          </div>
          <div>{operatorLookup[operation.operator]}</div>
        </div>
      ))}

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div>${total(operations)}</div>
        <div>total</div>
      </div>
    </div>
  );
};
