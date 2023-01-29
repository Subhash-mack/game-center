import { Context } from "@keystone-6/core/dist/declarations/src/types/schema/graphql-ts-schema";

declare global {
    namespace Express {
      interface Request {
        context?: Context
      }
    }
  }
