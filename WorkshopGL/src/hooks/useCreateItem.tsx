import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../api/axiosInstance";
import type { ItemUpdateDTO } from "../api/types";

export const useCreateItem = () => {
  return useMutation({
    mutationFn: async (itemData: ItemUpdateDTO) => {
      const response = await axiosInstance.post("/items", itemData);
      if (!response.data || !response.data.success) {
        throw new Error("Failed to create item");
      }
      return response.data;
    },
  });
};
