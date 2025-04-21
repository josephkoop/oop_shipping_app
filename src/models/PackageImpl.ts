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
        public shipping_method: number,
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

    static async selectAll(): Promise<{ packages: any[], customers: any[], retailers: any[], statuses: any[] } | null> {
        const packages = await query(
            'SELECT orders.*, retailers.name as retailer_name, customers.name as customer_name, statuses.name as status_name FROM orders LEFT JOIN retailers ON retailers.id = orders.retailer_id LEFT JOIN customers ON customers.id = orders.customer_id LEFT JOIN statuses ON statuses.id = orders.status_id ORDER BY orders.id'
        );
        const customers1 = await query('SELECT * FROM customers ORDER BY id');
        const retailers1 = await query('SELECT * FROM retailers ORDER BY id');
        const statuses1 = await query('SELECT * FROM statuses ORDER BY id');

        if(packages.rows.length === 0 || customers1.rows.length === 0 || retailers1.rows.length === 0 || statuses1.rows.length === 0) return null;

        return { packages: packages.rows, customers: customers1.rows, retailers: retailers1.rows, statuses: statuses1.rows };
    }

    static async printLabel(id: number): Promise<any | null> {
        const packages = await query(
            `SELECT orders.*, retailers.name as retailer_name, retailers.address as retailer_address, customers.name as customer_name, customers.address as customer_address, statuses.name as status_name FROM orders LEFT JOIN retailers ON retailers.id = orders.retailer_id LEFT JOIN customers ON customers.id = orders.customer_id LEFT JOIN statuses ON statuses.id = orders.status_id WHERE orders.id = $1 LIMIT 1`, [id]
        );

        if(packages.rows.length === 0) return null;

        return packages.rows[0];
    }

    static async selectById(id: number, shippingMethod?: number): Promise<any> {
        const result = await query('SELECT * FROM orders WHERE id = $1 LIMIT 1', [id]);
        if(result.rows.length === 0) return null;

        const { OneDayImpl } = await import("./OneDayImpl");
        const { TwoDayImpl } = await import("./TwoDayImpl");

        const row = result.rows[0];
        const shipping_method = (shippingMethod == undefined) ? row.shipping_method : shippingMethod;

        if(shipping_method == 1){
            return new OneDayImpl(
                row.id,
                row.retailer_id,
                row.customer_id,
                row.status_id,
                row.tracking_number,
                shipping_method,
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
                shipping_method,
                row.package_weight,
                row.cost_weight
            );
        }
    }

    static async addPackage(retailer_id: number, customer_id: number, shipping_method: number, package_weight: number, cost_weight: number): Promise<void> {
        
       const { OneDayImpl } = await import("./OneDayImpl");
       const { TwoDayImpl } = await import("./TwoDayImpl");

        const tracking_number = Math.floor(Math.random() * 9000000000 + 1000000000);

        if(shipping_method === 1){
            const newPackage = new OneDayImpl(
                0,
                retailer_id,
                customer_id,
                1,
                tracking_number,
                shipping_method,
                package_weight,
                cost_weight
            );

            newPackage.savePackage();
        }else{
            const newPackage = new TwoDayImpl(
                0,
                retailer_id,
                customer_id,
                1,
                tracking_number,
                shipping_method,
                package_weight,
                cost_weight
            );

            newPackage.savePackage();
        }
    }
}
