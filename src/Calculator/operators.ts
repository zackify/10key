export type Operation = { operator: string; value: string };

export const operatorLookup: any = {
  add: '+',
  multiply: '*',
  subtract: '-',
};

export const operatorFromKey: any = {
  '+': 'add',
  '-': 'subtract',
  '*': 'multiply',
};
