import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../api/axiosInstance";
import type { ItemUpdateDTO } from "../api/types";

export const useUpdateItem = () => {

    return useMutation({
        mutationFn: async ({id, data}: {id: string, data: ItemUpdateDTO }) => {
            const response = await axiosInstance.put(`/items/${id}`, data);
            if (!response.data || !response.data.success) {
                throw new Error('Failed to update item');
            }
            return response.data;
        },
    });
}