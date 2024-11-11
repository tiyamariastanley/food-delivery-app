import { server } from "./components/mocks/node";

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers after each test (to avoid test pollution).
afterEach(() => server.resetHandlers());

// Clean up and close server after tests.
afterAll(() => server.close());

console.log("setupTests.js is loaded");
