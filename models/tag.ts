import { list } from "@keystone-6/core"
import { allowAll } from "@keystone-6/core/access"
import { text, relationship } from "@keystone-6/core/fields"
import { operation } from "../helper/auth"

export default list({
  access: {
    operation: operation(),
  },
  ui: {
    isHidden: true,
  },

  fields: {
    name: text({ isIndexed: "unique" }),
    // this can be helpful to find out all the Posts associated with a Tag
    games: relationship({ ref: "Game.tags", many: true }),
  },
})
