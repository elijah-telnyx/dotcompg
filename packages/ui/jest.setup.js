import '@testing-library/jest-dom';
import preloadAll from 'jest-next-dynamic';

beforeAll(async () => {
  await preloadAll();
  jest.mock('next/router', () => jest.requireActual('next-router-mock'));
});
