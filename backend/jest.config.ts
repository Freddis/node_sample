import type {Config} from '@jest/types';
import {defaults} from 'jest-config';
// Sync object
const config: Config.InitialOptions = {
    verbose: true,
    preset: "ts-jest",
    silent: false,
    moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
    testMatch: ["**/src/tests/*.ts"]
};
export default config;
