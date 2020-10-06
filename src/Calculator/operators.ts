export type Operation = { operator: string; value: string };

export const operatorLookup: any = {
  add: '+',
  multiply: '*',
  subtract: '-',
  divide: '/',
};

export const operatorFromKey: any = {
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
  '/': 'divide',
  Enter: 'add',
};

export const total = (operations: Operation[]) => {
  return operations.reduce((acc, operation) => {
    let number = parseFloat(operation.value);

    if (operation.operator === 'add') {
      return acc + number;
    }
    if (operation.operator === 'multiply') {
      return acc * number;
    }
    if (operation.operator === 'subtract') {
      return acc - number;
    }
    if (operation.operator === 'divide') {
      return acc / number;
    }
    return acc;
  }, 0);
};
