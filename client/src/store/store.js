import { create } from 'zustand';
import StatusMessage from '../components/StatusMessage';

const useStore = create((set) => ({
    user: null,
    title: 'Dashboard',
    users: [],
    statusMessage: '',
    statusType: 'success', // 'success' or 'error'
    search: '',
    setStatusMessage: (message, type = 'success') => set({ statusMessage: message, statusType: type }),
    setUser: (user) => set({ user }),
    setTitle: (title) => set({ title }),
    clearUser: () => set({ user: null }),
    setUsers: (users) => set({ users }),
    setSearch: (search) => set({ search })
}));

export default useStore;
