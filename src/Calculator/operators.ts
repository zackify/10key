export type Operation = { operator: string; value: string };

export const operatorLookup: any = {
  add: '+',
  multiply: '*',
  subtract: '-',
  divide: '/',
  total: 'total',
};

export const operatorFromKey: any = {
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
  '/': 'divide',
};

export const total = (operations: Operation[]) => {
  let result = operations.reduce((acc, operation) => {
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
  return { formatted: toMoney(result), raw: result };
};

export const toMoney = (number: number) => {
  return new Intl.NumberFormat().format(number);
};
