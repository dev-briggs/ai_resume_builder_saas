import { create } from "zustand";

type PremiumModalStoreState = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

const initialState = {
  open: false,
};

const usePremiumModalStore = create<PremiumModalStoreState>((set) => ({
  open: initialState.open,
  setOpen: (open: boolean) => set({ open }),
}));

export default usePremiumModalStore;
