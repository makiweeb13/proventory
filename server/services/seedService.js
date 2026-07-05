const bcrypt = require('bcryptjs');
const { PrismaClient, Decimal } = require('../generated/prisma');
const prisma = new PrismaClient();

const seed = async () => {
    const result = { users: [], categories: [], products: [], sales: [] };

    const existingAdmin = await prisma.users.findFirst({ where: { role: 'admin' } });

    if (!existingAdmin) {
        const adminPassword = await bcrypt.hash('abcDEF123#', 10);
        const admin = await prisma.users.create({
            data: {
                name: 'Admin',
                email: 'admin@proventory.com',
                password: adminPassword,
                role: 'admin',
                account_status: 'active'
            }
        });
        result.users.push({ name: admin.name, email: admin.email, role: admin.role });
    }

    let staffUser = await prisma.users.findFirst({ where: { role: 'user' } });

    if (!staffUser) {
        const staffPassword = await bcrypt.hash('abcDEF123#', 10);
        staffUser = await prisma.users.create({
            data: {
                name: 'Staff',
                email: 'staff@proventory.com',
                password: staffPassword,
                role: 'user',
                account_status: 'active'
            }
        });
        result.users.push({ name: staffUser.name, email: staffUser.email, role: staffUser.role });
    }

    const existingCategories = await prisma.categories.count();

    if (existingCategories === 0) {
        const electronics = await prisma.categories.create({ data: { name: 'Electronics' } });
        const office = await prisma.categories.create({ data: { name: 'Office Supplies' } });
        const beverages = await prisma.categories.create({ data: { name: 'Beverages' } });
        result.categories.push(electronics.name, office.name, beverages.name);

        const existingProducts = await prisma.products.count();
        if (existingProducts === 0) {
            const laptop = await prisma.products.create({
                data: { name: 'Laptop', stock: 10, buying_price: 45000, selling_price: 55000, date_added: new Date(), category_id: electronics.category_id }
            });
            const mouse = await prisma.products.create({
                data: { name: 'Wireless Mouse', stock: 25, buying_price: 250, selling_price: 450, date_added: new Date(), category_id: electronics.category_id }
            });
            const printer = await prisma.products.create({
                data: { name: 'Printer', stock: 5, buying_price: 3500, selling_price: 5200, date_added: new Date(), category_id: office.category_id }
            });
            const paper = await prisma.products.create({
                data: { name: 'Bond Paper (ream)', stock: 50, buying_price: 180, selling_price: 250, date_added: new Date(), category_id: office.category_id }
            });
            const coffee = await prisma.products.create({
                data: { name: 'Coffee (box)', stock: 15, buying_price: 120, selling_price: 200, date_added: new Date(), category_id: beverages.category_id }
            });
            const water = await prisma.products.create({
                data: { name: 'Bottled Water (case)', stock: 30, buying_price: 150, selling_price: 240, date_added: new Date(), category_id: beverages.category_id }
            });
            result.products.push(laptop.name, mouse.name, printer.name, paper.name, coffee.name, water.name);

            const existingSales = await prisma.sales.count();
            if (existingSales === 0) {
                const sale1 = await prisma.sales.create({
                    data: { product_id: mouse.product_id, user_id: staffUser.user_id, amount: new Decimal(450).mul(3), sale_date: new Date('2026-06-15') }
                });
                const sale2 = await prisma.sales.create({
                    data: { product_id: paper.product_id, user_id: staffUser.user_id, amount: new Decimal(250).mul(10), sale_date: new Date('2026-06-16') }
                });
                const sale3 = await prisma.sales.create({
                    data: { product_id: coffee.product_id, user_id: staffUser.user_id, amount: new Decimal(200).mul(5), sale_date: new Date('2026-06-17') }
                });
                const sale4 = await prisma.sales.create({
                    data: { product_id: water.product_id, user_id: staffUser.user_id, amount: new Decimal(240).mul(8), sale_date: new Date('2026-06-18') }
                });
                result.sales.push(sale1.sales_id, sale2.sales_id, sale3.sales_id, sale4.sales_id);

                await prisma.products.update({ where: { product_id: mouse.product_id }, data: { stock: { decrement: 3 } } });
                await prisma.products.update({ where: { product_id: paper.product_id }, data: { stock: { decrement: 10 } } });
                await prisma.products.update({ where: { product_id: coffee.product_id }, data: { stock: { decrement: 5 } } });
                await prisma.products.update({ where: { product_id: water.product_id }, data: { stock: { decrement: 8 } } });
            }
        }
    }

    return result;
};

module.exports = { seed };
