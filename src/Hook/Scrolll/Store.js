import { create } from 'zustand';

export const useStore = create((set , get)=>({
    lenis: undefined,
    setLenis: (lenis) => set({ lenis }),
}))