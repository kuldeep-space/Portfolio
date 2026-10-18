// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

jest.mock(
  '@vercel/analytics/react',
  () => ({
    Analytics: () => null,
  }),
  { virtual: true }
);

jest.mock(
  'react-router-dom',
  () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    Link: ({ to, children, ...props }) => <a href={to} {...props}>{children}</a>,
    useLocation: () => ({ pathname: '/', hash: '' }),
    useParams: () => ({ id: '1' }),
  }),
  { virtual: true }
);

jest.mock(
  'react-syntax-highlighter/dist/esm/styles/prism',
  () => ({
    vscDarkPlus: {},
  }),
  { virtual: true }
);

jest.mock(
  'react-syntax-highlighter/dist/esm/styles/hljs',
  () => ({
    atomOneDark: {},
  }),
  { virtual: true }
);

jest.mock(
  'react-syntax-highlighter',
  () => {
    const Component = ({ children }) => <pre>{children}</pre>;
    Component.registerLanguage = jest.fn();
    return {
      PrismLight: Component,
      Light: Component,
    };
  },
  { virtual: true }
);

// Mock window.scrollTo
window.scrollTo = jest.fn();

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock Path2D for Canvas
global.Path2D = class Path2D {
  addPath() {}
};

// Mock HTMLCanvasElement.prototype.getContext for JSDOM
HTMLCanvasElement.prototype.getContext = () => ({
  setTransform: jest.fn(),
  fillRect: jest.fn(),
  save: jest.fn(),
  restore: jest.fn(),
  translate: jest.fn(),
  scale: jest.fn(),
  clip: jest.fn(),
  stroke: jest.fn(),
  fill: jest.fn(),
  beginPath: jest.fn(),
  arc: jest.fn(),
  createLinearGradient: () => ({ addColorStop: jest.fn() }),
  setLineDash: jest.fn(),
});

// Mock SVG methods in JSDOM
if (typeof SVGElement !== 'undefined') {
  SVGElement.prototype.getTotalLength = () => 100;
  SVGElement.prototype.getPointAtLength = () => ({ x: 0, y: 0 });
}

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
};
