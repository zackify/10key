import React from 'react';
import { Operation, operatorLookup, total } from './operators';

type Props = {
  operations: Operation[];
};

export const Output = ({ operations }: Props) => {
  return (
    <div style={{ height: 200, overflow: 'scroll', width: '100%' }}>
      {operations.map((operation, index) => {
        let isSubtract = operation.operator === 'subtract';
        return (
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
            <div style={{ color: isSubtract ? 'red' : undefined }}>
              {operatorLookup[operation.operator]}
            </div>
          </div>
        );
      })}

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
