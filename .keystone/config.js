"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};

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
    modifiedAt: (0, import_fields2.timestamp)({
      defaultValue: { kind: "now" },
      db: { map: "modified_at" },
      hooks: {
        resolveInput: ({ resolvedData }) => {
          if (resolvedData.isActive !== void 0) {
            return new Date();
          }
          return;
        }
      }
    }),
    image: (0, import_fields2.image)({ storage: "my_local_images" }),
    isActive: (0, import_fields2.checkbox)({ defaultValue: false }),
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

// server.ts
var import_express3 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));

// api/routes/analytics.ts
var import_express = require("express");

// helper/helper.ts
var calculateTotalSession = (sessions) => {
  return sessions.reduce((acc, val) => {
    return acc + val.session;
  }, 0);
};
var getGames = (analytics) => {
  const games = {};
  for (const user in analytics) {
    analytics[user].map((game) => {
      const gameData = Object.values(game)[0];
      const gameName = Object.keys(game)[0];
      if (!games[gameName]) {
        games[gameName] = calculateTotalSession(gameData);
      } else {
        games[gameName] += calculateTotalSession(gameData);
      }
    });
  }
  return games;
};
var getPlayers = (analytics) => {
  const players = {};
  for (const user in analytics) {
    analytics[user].map((game) => {
      const gameData = Object.values(game)[0];
      if (!players[user]) {
        players[user] = calculateTotalSession(gameData);
      } else {
        players[user] += calculateTotalSession(gameData);
      }
    });
  }
  return players;
};
var getGameAnalytics = (gameName, analytics) => {
  const graph = {};
  for (const user in analytics) {
    analytics[user].map((game) => {
      if (gameName === Object.keys(game)[0]) {
        const gameData = Object.values(game)[0];
        gameData.forEach(({ date, session: session2 }) => {
          if (!graph[date])
            graph[date] = session2;
          else
            graph[date] += session2;
        });
      }
    });
  }
  return graph;
};

// api/controller/analytics.ts
var AnalyticController = class {
};
__publicField(AnalyticController, "topGames", async (req, res) => {
  const { context } = req;
  const data = await context?.query.Analytic.findMany({ query: "id analytics" });
  const analytics = data?.[0]?.analytics;
  res.status(200).send(getGames(analytics));
});
__publicField(AnalyticController, "topPlayers", async (req, res) => {
  const { context } = req;
  const data = await context?.query.Analytic.findMany({ query: "id analytics" });
  const analytics = data?.[0]?.analytics;
  res.status(200).send(getPlayers(analytics));
});

// api/middleware/cache-control.ts
var cacheControl = (value) => (_, res, next) => {
  res.header("Cache-Control", value);
  if (value === "no-cache, no-store, must-revalidate" /* NO_STORE */) {
    res.header("Pragma", "no-cache");
    res.header("Expires", "0");
  }
  return next();
};

// api/routes/analytics.ts
var router = (0, import_express.Router)();
router.route("/top-players").get(cacheControl("max-age=900" /* MAX_AGE_DEFAULT */), AnalyticController.topPlayers);
router.route("/top-games").get(cacheControl("max-age=900" /* MAX_AGE_DEFAULT */), AnalyticController.topGames);
var analytics_default2 = router;

// api/routes/game.ts
var import_express2 = require("express");

// api/controller/game.ts
var GameController = class {
};
__publicField(GameController, "getGames", async (req, res) => {
  const { context } = req;
  const data = await context?.query.Game.findMany({
    query: "id, image {id, url} tags {id, name} name, isActive, modifiedAt"
  });
  res.status(200).send(data);
});
__publicField(GameController, "putGameInactive", async (req, res) => {
  try {
    const { context } = req;
    const id = req.params.id;
    const { isActive } = req.body;
    const data = await context?.query.Game.updateOne({
      where: { id },
      data: {
        isActive: !isActive
      }
    });
    res.status(200).send(200);
  } catch (err) {
    res.status(500).send(err);
  }
});
__publicField(GameController, "getGameDetail", async (req, res) => {
  const { context } = req;
  const id = req.params.id;
  const gameData = await context?.query.Game.findOne({
    where: { id },
    query: "id, name, description, createdAt,modifiedAt, isActive,image {id, url} tags {id, name}"
  });
  const analyticsData = await context?.query.Analytic.findMany({ query: "id analytics" });
  const analytics = analyticsData?.[0]?.analytics;
  const result = { ...gameData, graph: getGameAnalytics(gameData?.name, analytics) };
  res.status(200).send(result);
});

// api/routes/game.ts
var router2 = (0, import_express2.Router)();
router2.route("/games").get(cacheControl("max-age=900" /* MAX_AGE_DEFAULT */), GameController.getGames);
router2.route("/games/:id").get(cacheControl("max-age=900" /* MAX_AGE_DEFAULT */), GameController.getGameDetail).put(GameController.putGameInactive);
var game_default2 = router2;

// server.ts
var server_default = (app, context) => {
  app.use((0, import_cors.default)());
  app.use(import_express3.default.json({ limit: "2mb" }));
  app.use("/api/v1", async (req, res, next) => {
    req.context = await context.withRequest(req, res);
    next();
  }, analytics_default2, game_default2);
};

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
    session,
    server: {
      extendExpressApp: server_default
    }
  })
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
