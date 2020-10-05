import React, { CSSProperties, useRef } from 'react';
import copy from 'copy-to-clipboard';
import { total } from './Output';
import { Operation, operatorFromKey, operatorLookup } from './operators';

type Props = {
  currentInput: string;
  onInputChange: (value: string) => any;
  reset: () => any;
  operations: Operation[];
  addRow: (operation: string) => any;
};

export const Input = ({
  addRow,
  reset,
  operations,
  currentInput,
  onInputChange,
}: Props) => {
  let inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div style={{ display: 'flex' }}>
      <input
        ref={inputRef}
        type="text"
        style={{ width: '70%', height: 36 }}
        value={currentInput}
        onKeyPress={(e) => {
          let operator = operatorFromKey[e.key];
          if (currentInput && operator && parseFloat(currentInput))
            addRow(operator);
        }}
        onChange={(e) => {
          if (operatorFromKey[e.target.value]) return;
          onInputChange(e.target.value);
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div
          style={styles.button}
          onClick={() => {
            let longestStart = operations.reduce(
              (acc, op) =>
                new Intl.NumberFormat().format(parseFloat(op.value)).length >
                acc
                  ? op.value.length
                  : acc,
              0,
            );
            console.log(longestStart);
            // this looks so messy but it works and i made it in 5 minutes lol
            copy(`${operations
              .map((operation) => {
                let formattedValue = new Intl.NumberFormat().format(
                  parseFloat(operation.value),
                );
                return `${formattedValue} ${new Array(
                  longestStart - formattedValue.length + 10,
                )
                  .fill(0)
                  .map((op) => '')
                  .join(' ')} ${operatorLookup[operation.operator]}`;
              })
              .join('\n')}
${total(operations)}
            `);
            inputRef.current?.focus();
          }}
        >
          <span>C</span>
        </div>
        <div
          style={styles.button}
          onClick={() => {
            if (!window.confirm('Are you sure?')) return;
            reset();
            inputRef.current?.focus();
          }}
        >
          <span>R</span>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  button: {
    cursor: 'pointer',
    backgroundColor: '#2C4251',
    marginLeft: 5,
    width: 40,
    height: 40,
    color: '#D16666',
    fontSize: 30,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
