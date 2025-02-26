export const toTitleCase = (str: string) => {
  return str.replace(/\w\S*/g, (txt: string) => {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};

export function getNumbersFromString(str: string) {
  //input (123) 456-7899
  //output 1234567899
  return str.replace(/\D/g, '');
}

export const getFirstCharacter = (text: string) => {
  return text.charAt(0).toLowerCase();
};
