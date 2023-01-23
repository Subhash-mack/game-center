import { list } from "@keystone-6/core";
import { allowAll } from "@keystone-6/core/access";
import { text, checkbox, password, relationship, timestamp } from "@keystone-6/core/fields";


const User = list({
    access: allowAll,
    fields: {
      name: text({ validation: { isRequired: true } }),

      email: text({
        validation: { isRequired: true },
        isIndexed: 'unique',
      }),

      isAdmin: checkbox(),

      password: password({ validation: { isRequired: true } }),
      games: relationship({ ref: 'Game.player', many: true }),
      createdAt: timestamp({
        defaultValue: { kind: 'now' },
      }),
    },
  })

export default User;
