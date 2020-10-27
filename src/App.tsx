import { Input } from 'Calculator/Input';
import { Operation } from 'Calculator/operators';
import { Output } from 'Calculator/Output';
import { CopyOutput } from 'Calculator/CopyOutput';
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
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Output
            operations={state.operations}
            removeItem={(index) =>
              setState({
                ...state,
                operations: (state as State).operations.filter(
                  (_, cur) => cur !== index
                ),
              })
            }
          />
          <Input
            operations={state.operations}
            currentInput={state.currentInput}
            onInputChange={(currentInput) =>
              setState({ ...state, currentInput })
            }
            reset={() => setState(initialState)}
            addRow={(operator, value) =>
              setState({
                ...state,
                currentInput: '',
                operations: [
                  ...state.operations,
                  { operator, value: value || state.currentInput },
                ],
              })
            }
          />
        </div>

        <CopyOutput
          operations={state.operations}
          removeItem={(index) =>
            setState({
              ...state,
              operations: (state as State).operations.filter(
                (_, cur) => cur !== index
              ),
            })
          }
        />
      </div>
    </div>
  );
}

export default App;
