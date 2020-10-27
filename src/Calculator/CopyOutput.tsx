import React from 'react';
import { useScrollToBottom } from 'useScrollToBottom';
import { Operation, operatorLookup, toMoney } from './operators';

type Props = {
  operations: Operation[];
  removeItem: (index: number) => any;
};

export const CopyOutput = ({ operations, removeItem }: Props) => {
  let container = useScrollToBottom(operations);

  return (
    <div
      style={{
        marginTop: 20,
        overflow: 'scroll',
        width: 250,
        marginBottom: 12,
        backgroundColor: '#fff',
        borderRadius: 4,
        borderColor: '#000',
        borderStyle: 'solid',
        borderWidth: 2,
        padding: 13,
        minHeight: 300,
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
              justifyContent: 'flex-end',
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            <div style={{ color: isSubtract ? '#FF1B1C' : '#000' }}>
              {toMoney(parseFloat(operation.value))}
            </div>
            <div
              style={{
                marginLeft: 10,
                marginRight:
                  operatorLookup[operation.operator] === 'total' ? 0 : 10,
                display: 'flex',
                alignItems: 'center',
                color: isSubtract ? '#FF1B1C' : '#000',
                width: operatorLookup[operation.operator] === 'total' ? 0 : 10,
              }}
            >
              {operatorLookup[operation.operator] === 'total'
                ? ''
                : operatorLookup[operation.operator]}
            </div>
          </div>
        );
      })}
    </div>
  );
};
