import { useMutation } from '@tanstack/react-query';
import { axiosInstance } from '../api/axiosInstance';

export const useDeleteItem  = () => {

    return useMutation({
        mutationFn: async (id: string) => {
            const response = await axiosInstance.delete(`/items/${id}`);
            if (!response.data || !response.data.success) {
                throw new Error('Failed to delete item');
            }
            return response.data;
        },
    });
}