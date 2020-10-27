import React, { CSSProperties, useRef } from 'react';
import {  total } from './operators';
import { Operation, operatorFromKey } from './operators';

type Props = {
  currentInput: string;
  onInputChange: (value: string) => any;
  reset: () => any;
  operations: Operation[];
  addRow: (operation: string, value?: any) => any;
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
          if (e.key === 'Enter' && !currentInput)
            return addRow('total', total(operations).raw);
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
              onInputChange('');
              inputRef.current?.focus();
            }}
        >
          <span>Clear</span>
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
