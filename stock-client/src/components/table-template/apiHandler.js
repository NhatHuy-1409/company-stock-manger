import { useMutation,useQuery,useQueryClient } from '@tanstack/react-query';


//CREATE hook (post new user to api)
function useCreateItem(addItem) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user) => {
            await addItem(user)
        },
        //client side optimistic update
        onMutate: (newUserInfo) => {
            queryClient.setQueryData(['users'],(prevUsers) => [
                ...prevUsers,
                {
                    ...newUserInfo,
                    id: (Math.random() + 1).toString(36).substring(7),
                },
            ]);
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

//READ hook (get users from api)
function useGetItems(getItems) {
    return useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            //send api request here
            const data = await getItems()
            return data
        },
        refetchOnWindowFocus: false,
    });
}

//UPDATE hook (put user in api)
function useUpdateItem(updateItem) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (user) => {
            await updateItem(user)
        },
        //client side optimistic update
        onMutate: (newUserInfo) => {
            queryClient.setQueryData(['users'],(prevUsers) =>
                prevUsers?.map((prevUser) =>
                    prevUser.id === newUserInfo.id ? newUserInfo : prevUser,
                ),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

//DELETE hook (delete user in api)
function useDeleteItem(deleteItem) {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (userId) => {

            console.log("api handler",{ userId });

            //send api update request here
            await deleteItem(userId)
        },
        //client side optimistic update
        onMutate: (userId) => {
            queryClient.setQueryData(['users'],(prevUsers) =>
                prevUsers?.filter((user) => user.id !== userId),
            );
        },
        // onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }), //refetch users after mutation, disabled for demo
    });
}

export {
    useCreateItem,
    useGetItems,
    useUpdateItem,
    useDeleteItem
}