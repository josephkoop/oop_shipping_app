// PackageImpl.ts
import { Package } from "../interfaces/Package";
import { query } from '../db/db';

export class PackageImpl implements Package {
    constructor(
        public id: number,
        public retailer_id: number,
        public customer_id: number,
        public status_id: number,
        public tracking_number: number,
        public package_weight: number,
        public cost_weight: number,
    ) {}

    async updatePackage(status_id: number): Promise<void> {         //Watch if matching names throw error
        this.status_id = status_id;
        await query('UPDATE orders SET status_id = $1 WHERE id = $2', [status_id, this.id]);
    }

    async deletePackage(): Promise<void> {
        await query('DELETE FROM orders WHERE id = $1', [this.id]);
    }

    static async selectAll(): Promise<{ one: PackageImpl[]; two: PackageImpl[] } | null> {
        const result1 = await query('SELECT * FROM orders WHERE shipping_method = 1 ORDER BY id');
        const result2 = await query('SELECT * FROM orders WHERE shipping_method = 2 ORDER BY id');
        if(result1.rows.length === 0 && result2.rows.length) return null;

        const packages = {
            one: result1.rows.map((row: any) => new PackageImpl(
                row.id,
                row.retailer_id,
                row.customer_id,
                row.status_id,
                row.tracking_number,
                row.package_weight,
                row.cost_weight
            )),
            two: result2.rows.map((row: any) => new PackageImpl(
                row.id,
                row.retailer_id,
                row.customer_id,
                row.status_id,
                row.tracking_number,
                row.package_weight,
                row.cost_weight
            ))
        };

        return packages;
    }

    static async selectById(id: number): Promise<any> {
        const result = await query('SELECT * FROM orders WHERE id = $1 LIMIT 1', [id]);
        if(result.rows.length === 0) return null;

        const row = result.rows[0];

        const { OneDayImpl } = await import("./OneDayImpl");
        const { TwoDayImpl } = await import( "./TwoDayImpl");

        if(row.shipping_method === 1){
            return new OneDayImpl(
                row.id,
                row.retailer_id,
                row.customer_id,
                row.status_id,
                row.tracking_number,
                row.package_weight,
                row.cost_weight
            );
        }else{
            return new TwoDayImpl(
                row.id,
                row.retailer_id,
                row.customer_id,
                row.status_id,
                row.tracking_number,
                row.package_weight,
                row.cost_weight
            );
        }
    }

    static async addPackage(retailer_id: number, customer_id: number, shipping_method: number, package_weight: number, cost_weight: number): Promise<any> {
        const { OneDayImpl } = await import("./OneDayImpl");
        const { TwoDayImpl } = await import( "./TwoDayImpl");

        const tracking_number = Math.floor(Math.random() * 9000000000 + 1000000000);

        if(shipping_method === 1){
            return new OneDayImpl(
                0,
                retailer_id,
                customer_id,
                1,
                tracking_number,
                package_weight,
                cost_weight
            );
        }else{
            return new TwoDayImpl(
                0,
                retailer_id,
                customer_id,
                1,
                tracking_number,
                package_weight,
                cost_weight
            );
        }
    }
}
