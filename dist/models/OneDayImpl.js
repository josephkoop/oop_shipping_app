"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OneDayImpl = void 0;
// OneDayImpl.ts
const PackageImpl_1 = require("./PackageImpl");
class OneDayImpl extends PackageImpl_1.PackageImpl {
    constructor(senderName, receiverName, senderAddress, receiverAddress, packageWeight, status, trackingNumber, costPerWeightUnit, flatShippingFee) {
        super(senderName, receiverName, senderAddress, receiverAddress, packageWeight, status, trackingNumber, costPerWeightUnit);
        this.flatShippingFee = flatShippingFee;
    }
    calculateCost() {
        return this.packageWeight * this.costPerWeightUnit + this.flatShippingFee;
    }
    static addPackage(packageInstance) {
        OneDayImpl.packages.push(packageInstance);
    }
    static getAllPackages() {
        return OneDayImpl.packages;
    }
}
exports.OneDayImpl = OneDayImpl;
OneDayImpl.packages = [
    new OneDayImpl("A. B.", "C. D.", "123 Main St", "456 Elm St", 2, "Ordered", "123456", 10, 30)
];
