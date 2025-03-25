import { create } from 'zustand';

const useRecipeStore = create((set) => ({
  recipeId: null,
  // setRecipeId: () => set((state) => ({ recipeId: state.id })),
  setRecipeId: (Id) => set({ recipeId: Id }),
}));

export default useRecipeStore;
