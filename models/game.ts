import { list } from "@keystone-6/core";
import { operation } from "../helper/auth";
import { text, relationship, float, timestamp, checkbox } from "@keystone-6/core/fields";

export default list({

    access: {
        operation
    },
    fields: {
        name: text({ validation: { isRequired: true, length: { min: 3, max: 30 } } }),
        description: text({ validation: { isRequired: true, length: { min: 20 } } }),
        version: float({ validation: { isRequired: true, min: 1 } }),
        createdAt: timestamp({ defaultValue: { kind: "now" }, db: { map: "created_at" } }),
        modifiedAt: timestamp({defaultValue:{kind:"now"}, db: { map: "modified_at" } , hooks: {
            resolveInput: ({ resolvedData }) => {
              if (resolvedData.active!==undefined) {
                return new Date();
              }
              return;
            },
          }}),
        active: checkbox({ defaultValue: false }),
        tags: relationship({
            ref: 'Tag.games',
            many: true,
            ui: {
                displayMode: 'cards',
                cardFields: ['name'],
                inlineEdit: { fields: ['name'] },
                linkToItem: true,
                inlineConnect: true,
                inlineCreate: { fields: ['name'] },
            },
        }),
        player: relationship({
            ref: 'User.games'
        })
    }

})