
import { allowAll } from "@keystone-6/core/access";
import { Session } from "../types/auth"

const isAdmin = ({ session }: { session:Session }) => session?.data?.isAdmin;

export const operation = {
    query: allowAll,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
}
