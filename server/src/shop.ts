import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import express, { Response, Request } from 'express';
import { OrderItem, order_items, orders, products } from './db/schema';
import { eq } from 'drizzle-orm';
const router = express.Router();

const pool = new Pool({
  connectionString: `${process.env.DATABASE_URL}`,
  ssl: { rejectUnauthorized: false },
});
const db = drizzle(pool);

const handleQueryError = (err: any, res: Response) => {
  console.error('Error executing query:', err);
  res.status(500).json({ error: 'An error occured while executing the query' });
};

router.get('/products', async (req: Request, res: Response) => {
  try {
    const rows = await db.select().from(products);
    res.json(rows);
  } catch (err) {
    handleQueryError(err, res);
  }
});

router.get('/products/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const rows = await db.select().from(products).where(eq(products.id, +id));
    if (rows.length === 0) {
      return res.status(404).json({ error: `Product with id ${id} not found` });
    }
    res.json(rows[0]);
  } catch (err) {
    handleQueryError(err, res);
  }
});

router.post('/orders', async (req: Request, res: Response) => {
  try {
    const { email, products: orderBody } = req.body;
    const order = await db.transaction(async (trx) => {
      const [newOrder] = await trx
        .insert(orders)
        .values({ customer_email: email })
        .returning();
      const productPrices = await Promise.all(
        orderBody.map(async (orderItem: any) => {
          const [res] = await db
            .select()
            .from(products)
            .where(eq(products.id, +orderItem.id));
          return res.product_price;
        })
      );
      const orderProducts = await Promise.all(
        orderBody.map(async (orderItem: any, index: number) => {
          const total = (+productPrices[index] * +orderItem.quantity).toFixed(
            2
          );
          const [orderProduct] = await trx
            .insert(order_items)
            .values({
              order_id: newOrder.id,
              product_id: orderItem.product_id,
              quantity: orderItem.quantity,
              total: +total,
            })
            .returning();
          return orderProduct;
        })
      );

      const total = orderProducts.reduce((acc: number, curr: OrderItem) => {
        return acc + curr.total;
      }, 0);

      const [updatedOrder] = await trx
        .update(orders)
        .set({ total: total.toFixed(2) })
        .where(eq(orders.id, newOrder.id))
        .returning();
      return { ...updatedOrder, products: orderProducts };
    });
    res.json(order);
  } catch (err) {
    handleQueryError(err, res);
  }
});

export default router;
