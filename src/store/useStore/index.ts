import create from "zustand";

type Store = {
  name: string | null;
  setName: (_: string) => void;
};

export const useStore = create<Store>((set:any, get:any) => ({
  name: null,
  setName: (name:string) => set({ name })
}));
