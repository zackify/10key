import React, { CSSProperties, useRef } from 'react';

export type Operation = { operator: string; value: string };
type Operator = { label: string; value: string };

const operators: Operator[] = [
  { label: '+', value: 'add' },
  { label: '-', value: 'subtract' },
  { label: '∗', value: 'multiply' },
];

type Props = {
  currentInput: string;
  onInputChange: (value: string) => any;
  addRow: (operation: Operation) => any;
};

export const Input = ({ addRow, currentInput, onInputChange }: Props) => {
  let inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div style={{ display: 'flex' }}>
      <input
        ref={inputRef}
        type="number"
        style={{ width: '70%', height: 36 }}
        value={currentInput}
        onChange={(e) => onInputChange(e.target.value)}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {operators.map((operator) => (
          <div
            style={styles.button}
            key={operator.label}
            onClick={() => {
              inputRef.current?.focus();
              if (currentInput)
                addRow({ operator: operator.value, value: currentInput });
            }}
          >
            <span>{operator.label}</span>
          </div>
        ))}
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
  },
};
