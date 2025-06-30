import { create } from 'zustand';

const useStore = create((set) => ({
    user: null,
    title: 'Dashboard',
    users: [],
    setUser: (user) => set({ user }),
    setTitle: (title) => set({ title }),
    clearUser: () => set({ user: null }),
    setUsers: (users) => set({ users }),
}));

export default useStore;
