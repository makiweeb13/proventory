import { create } from 'zustand';

const useStore = create((set, get) => ({
    user: null,
    title: 'Dashboard',
    users: [],
    statusMessage: '',
    statusType: 'success', // 'success' or 'error'
    search: '',
    categories: [],
    products: [],
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
    getCategoryById: (id) => {
        const state = get();
        return state.categories.find(category => category.category_id === id);
    },
    addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),
    deleteCategory: (id) => set((state) => ({
        categories: state.categories.filter(category => category.category_id !== id)
    })),
    setProducts: (products) => set({ products }),
    addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
    updateProduct: (updatedProduct) => set((state) => ({
        products: state.products.map(product => product.product_id === updatedProduct.product_id ? updatedProduct : product)
    })),
    deleteProduct: (id) => set((state) => ({
        products: state.products.filter(product => product.product_id !== id)
    }))
}));

export default useStore;
