// Package.ts
export interface Package {
    id: number;
    retailer_id: number;
    customer_id: number;
    status_id: number;
    tracking_number: number;
    shipping_method: number;
    package_weight: number;
    cost_weight: number;

    updatePackage(status_id: number): void;
    deletePackage(): void,
}