import { Input } from 'Calculator/Input';
import { Operation } from 'Calculator/operators';
import { Output } from 'Calculator/Output';
import React from 'react';
import { useStorage } from 'useStorage';

type State = {
  operations: Operation[];
  currentInput: string;
};
const initialState = {
  operations: [],
  currentInput: '',
};

function App() {
  let [state, setState] = useStorage(initialState);
  return (
    <div className="wrapper">
      <div>
        <Output operations={state.operations} />
        <Input
          operations={state.operations}
          currentInput={state.currentInput}
          onInputChange={(currentInput) => setState({ ...state, currentInput })}
          reset={() => setState(initialState)}
          addRow={(operator) =>
            setState({
              ...state,
              currentInput: '',
              operations: [
                ...state.operations,
                { operator, value: state.currentInput },
              ],
            })
          }
        />
      </div>
    </div>
  );
}

export default App;
