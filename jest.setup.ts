import { TextDecoder, TextEncoder } from 'node:util';
import 'whatwg-fetch';
import dotenv from 'dotenv';
dotenv.config();

/* eslint-disable no-restricted-globals */
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock as any;
