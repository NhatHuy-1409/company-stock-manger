import { getUsers } from "../api/stock-manager";

export const users = async () => {
    const listUsers = await getUsers();
    return listUsers.map((item) => ({
        label: item.full_name,
        value: item.id,
        permission: item.permission,
    }));
};
