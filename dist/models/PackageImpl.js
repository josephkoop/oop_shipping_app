"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageImpl = void 0;
class PackageImpl {
    constructor(senderName, receiverName, senderAddress, receiverAddress, packageWeight, status, trackingNumber, costPerWeightUnit) {
        this.senderName = senderName;
        this.receiverName = receiverName;
        this.senderAddress = senderAddress;
        this.receiverAddress = receiverAddress;
        this.packageWeight = packageWeight;
        this.status = status;
        this.trackingNumber = trackingNumber;
        this.costPerWeightUnit = costPerWeightUnit;
    }
    updateStatus(newStatus) {
        const validStatuses = ["Ordered", "Shipped", "Delivered", "Delayed"];
        if (validStatuses.includes(newStatus)) {
            this.status = newStatus;
        }
        else {
            throw new Error("Invalid status update");
        }
    }
    printLabel() {
        console.log(`Sender: ${this.senderName}\nReceiver: ${this.receiverName}\nSender Address: ${this.senderAddress}\nReceiver Address: ${this.receiverAddress}\nWeight: ${this.packageWeight}kg\nStatus: ${this.status}`);
    }
}
exports.PackageImpl = PackageImpl;
