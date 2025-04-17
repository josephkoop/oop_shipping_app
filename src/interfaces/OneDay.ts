// OneDay.ts
import { Package } from "./Package";

export interface OneDay extends Package {
    savePackage(): void;
    editPackage(id: number, retailer_id: number, customer_id: number, status_id: number, tracking_number: number, shipping_method: number, package_weight: number, cost_weight: number): void;
    calculatePackage(): object
}