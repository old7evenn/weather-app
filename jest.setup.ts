import { TextDecoder, TextEncoder } from 'node:util';
import 'whatwg-fetch';

/* eslint-disable no-restricted-globals */
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder as any;

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

global.ResizeObserver = ResizeObserverMock as any;
