import React, { CSSProperties, useRef } from 'react';
import copy from 'copy-to-clipboard';
import { total } from './operators';
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
          onClick={async () => {
            let longestStart = operations.reduce(
              (acc, op) =>
                new Intl.NumberFormat().format(parseFloat(op.value)).length >
                acc
                  ? op.value.length
                  : acc,
              0,
            );
            let sum = total(operations);
            // this looks so messy but it works and i made it in 5 minutes lol
            let text = `${operations
              .map((operation) => {
                let formattedValue = new Intl.NumberFormat().format(
                  parseFloat(operation.value),
                );
                let isSubtract = operation.operator === 'subtract';

                return `${
                  isSubtract ? '<span style="color:red;">' : ''
                }${formattedValue}${isSubtract ? '</span>' : ''} ${new Array(
                  longestStart - formattedValue.length + 10,
                )
                  .fill(0)
                  .map((op) => ' ')
                  .join('&nbsp;')} ${operatorLookup[operation.operator]}`;
              })
              .join('<br />\n')}<br />\n
${sum} ${new Array(longestStart - sum.length + 10)
              .fill(0)
              .map((op) => ' ')
              .join('&nbsp;')} total`;

            copy(text, { format: 'text/html' });
          }}
        >
          <span>Copy</span>
        </div>
        <div
          style={styles.button}
          onClick={() => {
            if (!window.confirm('Are you sure?')) return;
            reset();
            inputRef.current?.focus();
          }}
        >
          <span>Reset</span>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: CSSProperties } = {
  button: {
    cursor: 'pointer',
    backgroundColor: '#D16666',
    marginLeft: 5,
    paddingLeft: 5,
    paddingRight: 5,
    height: 40,
    color: '#2C4251',
    fontSize: 30,
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};
