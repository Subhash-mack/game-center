import { list } from "@keystone-6/core";
import { json } from "@keystone-6/core/fields";
import { operation } from "../helper/auth";

export default list({
    access: {
        operation
    },
    fields:{
        analytics: json()
    }
})
