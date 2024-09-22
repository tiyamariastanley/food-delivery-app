import { setupServer } from "msw/node";
import { handlers } from "./handlers";

// Set up the service with the defined handlers
export const server = setupServer(...handlers);
