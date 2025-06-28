import { create } from 'zustand';

const useStore = create((set) => ({
    user: null,
    title: 'Dashboard',
    setUser: (user) => set({ user }),
    setTitle: (title) => set({ title }),
    clearUser: () => set({ user: null }),
}));

export default useStore;
