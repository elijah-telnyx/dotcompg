export interface LLMModel {
  index?: number;
  id: string;
  object: string;
  created: string;
  owned_by: string;
  organization: string;
  task: string;
  context_length: number;
  languages: string[];
  parameters: number;
  parameters_str: string;
  tier: string;
  license: string;
  URL?: boolean;
}

export const parseTask = (task: string) => {
  return task.replace('-', ' ');
};

export const parseName = (name: string) => {
  return name.split('/')[1];
};

export const parseLang = (language: string[]) => {
  const length = language.length;
  if (length > 1 || language[0].toLowerCase() === 'multilingual') {
    return 'Multilingual';
  }
  if (language[0].toLowerCase() === 'en') {
    return 'English';
  }
  return language[0];
};

const utils = { parseTask, parseLang, parseName };

export default utils;
