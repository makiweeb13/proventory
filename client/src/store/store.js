import { create } from 'zustand';
import StatusMessage from '../components/StatusMessage';

const useStore = create((set) => ({
    user: null,
    title: 'Dashboard',
    users: [],
    statusMessage: '',
    statusType: 'success', // 'success' or 'error'
    search: '',
    categories: [],
    setStatusMessage: (message, type = 'success') => set({ statusMessage: message, statusType: type }),
    setUser: (user) => set({ user }),
    setTitle: (title) => set({ title }),
    clearUser: () => set({ user: null }),
    setUsers: (users) => set({ users }),
    addUser: (user) => set((state) => ({ users: [...state.users, user] })),
    updateUser: (updatedUser) => set((state) => ({
        users: state.users.map(user => user.user_id === updatedUser.user_id ? updatedUser : user)
    })),
    deleteUser: (id) => set((state) => ({
        users: state.users.filter(user => user.user_id !== id)
    })),     
    clearUsers: () => set({ users: [] }),
    clearStatusMessage: () => set({ statusMessage: '', statusType: 'success' }),
    setSearch: (search) => set({ search }),
    setCategories: (categories) => set({ categories }),
    addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
    deleteCategory: (id) => set((state) => ({
        categories: state.categories.filter(category => category.category_id !== id)
    }))
}));

export default useStore;
