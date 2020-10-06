import React from 'react';
import { useScrollToBottom } from 'useScrollToBottom';
import { Operation, operatorLookup, total } from './operators';

type Props = {
  operations: Operation[];
};

export const Output = ({ operations }: Props) => {
  let container = useScrollToBottom(operations);
  let longestStart = operations.reduce(
    (acc, op) =>
      new Intl.NumberFormat().format(parseFloat(op.value)).length > acc
        ? op.value.length
        : acc,
    0,
  );
  return (
    <div
      style={{
        height: 300,
        overflow: 'scroll',
        width: '70%',
        marginBottom: 12,
      }}
      ref={(ref) => (container.current = ref)}
    >
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
            <div style={{ color: isSubtract ? '#FF1B1C' : undefined }}>
              ${new Intl.NumberFormat().format(parseFloat(operation.value))}
            </div>
            <div style={{ marginRight: 10 }}>
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
        <div style={{ marginRight: 10 }}>total</div>
      </div>
    </div>
  );
};
