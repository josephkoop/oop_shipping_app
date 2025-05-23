// OneDayImpl.ts
import { PackageImpl } from './PackageImpl';
import { OneDay } from '../interfaces/OneDay';
import { query } from '../db/db';

export class OneDayImpl extends PackageImpl implements OneDay {
    constructor(
        id: number,
        retailer_id: number,
        customer_id: number,
        status_id: number,
        tracking_number: number,
        shipping_method: number,
        package_weight: number,
        cost_weight: number,
    ) {
        super(
            id,
            retailer_id,
            customer_id,
            status_id,
            tracking_number,
            shipping_method,
            package_weight,
            cost_weight,
        );
    }

    static flat_fee: number = 30;
    static shipping_method = 1;

    async savePackage(): Promise<void> {
        const result = await query('INSERT INTO orders (retailer_id, customer_id, status_id, tracking_number, shipping_method, package_weight, cost_weight) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', 
            [
                this.retailer_id,
                this.customer_id,
                this.status_id,
                this.tracking_number,
                OneDayImpl.shipping_method,
                this.package_weight,
                this.cost_weight
            ]);
        this.id = result.rows[0].id;
    }

    async editPackage(id: number, retailer_id: number, customer_id: number, status_id: number, tracking_number: number, shipping_method: number, package_weight: number, cost_weight: number): Promise<void>{
        this.retailer_id = retailer_id;
        this.customer_id = customer_id;
        this.status_id = status_id;
        this.tracking_number = tracking_number;
        this.shipping_method = shipping_method;
        this.package_weight = package_weight;
        this.cost_weight = cost_weight;
        this.id = id;

        await query('UPDATE orders SET retailer_id = $1, customer_id = $2, status_id = $3, tracking_number = $4, shipping_method = $5, package_weight = $6, cost_weight = $7 WHERE id = $8', 
            [
                this.retailer_id,
                this.customer_id,
                this.status_id,
                this.tracking_number,
                OneDayImpl.shipping_method,
                this.package_weight,
                this.cost_weight,
                this.id,
            ]
        );
    }

    async calculatePackage(): Promise<object> {
        const totalCost1 = (this.package_weight * this.cost_weight + OneDayImpl.flat_fee).toFixed(2);
        const resultObject = { trackingNumber: this.tracking_number, flatFee: OneDayImpl.flat_fee.toFixed(2), shippingMethod: OneDayImpl.shipping_method, packageWeight: this.package_weight, costWeight: this.cost_weight, totalCost: totalCost1 }

        return resultObject;
    }
}
