export const number = {
  descending: (a: number, b: number) => b - a,
  ascending: (a: number, b: number) => a - b,
};

export const string = {
  descending: (a: string, b: string) => b.localeCompare(a),
  ascending: (a: string, b: string) => a.localeCompare(b),
};

const sort = {
  number,
  string,
};

export default sort;
