import { Input, Operation } from 'Calculator/Input';
import { Output } from 'Calculator/Output';
import React, { useState } from 'react';

type State = {
  operations: Operation[];
  currentInput: string;
};
const initialState = {
  operations: [],
  currentInput: '',
};

function App() {
  let [state, setState] = useState<State>(initialState);
  return (
    <div className="wrapper">
      <div>
        <Output operations={state.operations} />
        <Input
          currentInput={state.currentInput}
          onInputChange={(currentInput) => setState({ ...state, currentInput })}
          addRow={(operator) =>
            setState({
              ...state,
              currentInput: '',
              operations: [...state.operations, operator],
            })
          }
        />
        <div style={{ display: 'flex' }}>
          <div>Copy</div>
          <div>Reset</div>
        </div>
      </div>
    </div>
  );
}

export default App;
