import React from 'react';
import { useScrollToBottom } from 'useScrollToBottom';
import { Operation, operatorLookup, toMoney, total } from './operators';

type Props = {
  operations: Operation[];
  removeItem: (index: number) => any;
};

export const Output = ({ operations, removeItem }: Props) => {
  let container = useScrollToBottom(operations);

  return (
    <div
      style={{
        marginTop: 20,
        height: 300,
        overflow: 'scroll',
        width: 350,
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
              borderBottom: '1px solid #FFFFFC',
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            <div style={{ color: isSubtract ? '#FF1B1C' : undefined }}>
              ${toMoney(parseFloat(operation.value))}
            </div>
            <div
              style={{
                marginRight: 10,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {operatorLookup[operation.operator]}
              <div
                style={{ fontSize: 10, marginLeft: 12, cursor: 'pointer' }}
                onClick={() => removeItem(index)}
              >
                Delete
              </div>
            </div>
          </div>
        );
      })}

      <div
        style={{
          display: 'flex',
          paddingTop: 4,
          paddingBottom: 4,
          justifyContent: 'space-between',
        }}
      >
        <div>${total(operations).formatted}</div>
        <div style={{ marginRight: 10 }}>running total</div>
      </div>
    </div>
  );
};
