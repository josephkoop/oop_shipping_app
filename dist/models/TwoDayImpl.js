"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TwoDayImpl = void 0;
// TwoDayImpl.ts
const PackageImpl_1 = require("./PackageImpl");
class TwoDayImpl extends PackageImpl_1.PackageImpl {
    constructor(senderName, receiverName, senderAddress, receiverAddress, packageWeight, status, trackingNumber, costPerWeightUnit, flatShippingFee) {
        super(senderName, receiverName, senderAddress, receiverAddress, packageWeight, status, trackingNumber, costPerWeightUnit);
        this.flatShippingFee = flatShippingFee;
    }
    calculateCost() {
        return this.packageWeight * this.costPerWeightUnit + this.flatShippingFee;
    }
    static addPackage(packageInstance) {
        TwoDayImpl.packages.push(packageInstance);
    }
    static getAllPackages() {
        return TwoDayImpl.packages;
    }
}
exports.TwoDayImpl = TwoDayImpl;
TwoDayImpl.packages = [
    new TwoDayImpl("E. F.", "G. H.", "789 Oak St", "321 Pine St", 3, "Shipped", "789123", 15, 50),
    new TwoDayImpl("I. J.", "K. L.", "654 Birch St", "987 Cedar St", 4, "Delayed", "147963", 15, 50)
];
