import type { Config } from '@jest/types';
import baseConfig from './jest.config';

const config: Config.InitialOptions = {
  ...baseConfig,
  testRegex: '.e2e-spec.ts$', // ou .spec.ts si tu fais tout dedans
};

export default config;