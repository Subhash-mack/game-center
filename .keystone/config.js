"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// keystone.ts
var keystone_exports = {};
__export(keystone_exports, {
  default: () => keystone_default
});
module.exports = __toCommonJS(keystone_exports);
var import_core5 = require("@keystone-6/core");
var dotenv = __toESM(require("dotenv"));

// models/user.ts
var import_core = require("@keystone-6/core");
var import_access = require("@keystone-6/core/access");
var import_fields = require("@keystone-6/core/fields");
var User = (0, import_core.list)({
  access: import_access.allowAll,
  fields: {
    name: (0, import_fields.text)({ validation: { isRequired: true } }),
    email: (0, import_fields.text)({
      validation: { isRequired: true },
      isIndexed: "unique"
    }),
    isAdmin: (0, import_fields.checkbox)(),
    password: (0, import_fields.password)({ validation: { isRequired: true } }),
    games: (0, import_fields.relationship)({ ref: "Game", many: true }),
    createdAt: (0, import_fields.timestamp)({
      defaultValue: { kind: "now" }
    })
  }
});
var user_default = User;

// models/game.ts
var import_core2 = require("@keystone-6/core");

// helper/auth.ts
var import_access2 = require("@keystone-6/core/access");
var isAdmin = ({ session: session2 }) => session2?.data?.isAdmin;
var operation = {
  query: import_access2.allowAll,
  create: isAdmin,
  update: isAdmin,
  delete: isAdmin
};

// models/game.ts
var import_fields2 = require("@keystone-6/core/fields");
var game_default = (0, import_core2.list)({
  access: {
    operation
  },
  fields: {
    name: (0, import_fields2.text)({ validation: { isRequired: true, length: { min: 3, max: 30 } } }),
    description: (0, import_fields2.text)({ validation: { isRequired: true, length: { min: 20 } } }),
    version: (0, import_fields2.float)({ validation: { isRequired: true, min: 1 } }),
    createdAt: (0, import_fields2.timestamp)({ defaultValue: { kind: "now" }, db: { map: "created_at" } }),
    modifiedAt: (0, import_fields2.timestamp)({ defaultValue: { kind: "now" }, db: { map: "modified_at" }, hooks: {
      resolveInput: ({ resolvedData }) => {
        if (resolvedData.active !== void 0) {
          return new Date();
        }
        return;
      }
    } }),
    image: (0, import_fields2.image)({ storage: "my_local_images" }),
    active: (0, import_fields2.checkbox)({ defaultValue: false }),
    tags: (0, import_fields2.relationship)({
      ref: "Tag.games",
      many: true,
      ui: {
        displayMode: "cards",
        cardFields: ["name"],
        inlineEdit: { fields: ["name"] },
        linkToItem: true,
        inlineConnect: true,
        inlineCreate: { fields: ["name"] }
      }
    })
  }
});

// models/tag.ts
var import_core3 = require("@keystone-6/core");
var import_fields3 = require("@keystone-6/core/fields");
var tag_default = (0, import_core3.list)({
  access: {
    operation
  },
  ui: {
    isHidden: true
  },
  fields: {
    name: (0, import_fields3.text)(),
    games: (0, import_fields3.relationship)({ ref: "Game.tags", many: true })
  }
});

// models/analytics.ts
var import_core4 = require("@keystone-6/core");
var import_fields4 = require("@keystone-6/core/fields");
var analytics_default = (0, import_core4.list)({
  access: {
    operation
  },
  fields: {
    analytics: (0, import_fields4.json)()
  }
});

// models/schema.ts
var lists = {
  User: user_default,
  Game: game_default,
  Tag: tag_default,
  Analytic: analytics_default
};

// auth.ts
var import_crypto = require("crypto");
var import_auth4 = require("@keystone-6/auth");
var import_session = require("@keystone-6/core/session");
var sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret && process.env.NODE_ENV !== "production") {
  sessionSecret = (0, import_crypto.randomBytes)(32).toString("hex");
}
var { withAuth } = (0, import_auth4.createAuth)({
  listKey: "User",
  identityField: "email",
  sessionData: "name createdAt isAdmin",
  secretField: "password",
  initFirstItem: {
    fields: ["name", "email", "password"]
  }
});
var sessionMaxAge = 60 * 60 * 24 * 30;
var session = (0, import_session.statelessSessions)({
  maxAge: sessionMaxAge,
  secret: sessionSecret
});

// models/config.ts
var storage = {
  my_local_images: {
    kind: "local",
    type: "image",
    generateUrl: (path) => `${process.env.SERVER_PORT}/images${path}`,
    serverRoute: {
      path: "/images"
    },
    storagePath: "public/images"
  },
  my_local_files: {
    kind: "local",
    type: "file",
    generateUrl: (path) => `${process.env.SERVER_PORT}/files${path}`,
    serverRoute: {
      path: "/files"
    },
    storagePath: "public/files"
  }
};
var config_default = storage;

// keystone.ts
dotenv.config();
var keystone_default = withAuth(
  (0, import_core5.config)({
    db: {
      provider: "sqlite",
      url: "file:./keystone.db"
    },
    storage: config_default,
    lists,
    session
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
