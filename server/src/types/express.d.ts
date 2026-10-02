// Adds the `user` property (set by the `protect` middleware) to Express's Request type.
declare global {
  namespace Express {
    interface Request {
      user?: string;
    }
  }
}

export {};
