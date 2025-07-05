import * as yup from 'yup';

export const productSchema = yup.object().shape({
    name: yup.string()
        .required('Product name is required'),
    stock: yup.number()
        .min(0, 'Stock must be a positive number').required('Stock is required'),
    buying_price: yup.number()
        .min(0, 'Buying price must be a positive number').required('Buying price is required'),
    selling_price: yup.number()
        .min(0, 'Selling price must be a positive number').required('Selling price is required'),
    category_id: yup.string().required('Category is required'),
});