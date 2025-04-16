import { PackageImpl } from '../models/PackageImpl';
import { Request, Response } from 'express';
import path from 'path';
import { OneDayImpl } from '../models/OneDayImpl';
import { TwoDayImpl } from '../models/TwoDayImpl';

export const index = async (req: Request, res: Response): Promise<void> => {
    try {
        res.sendFile(path.join(__dirname, '../public/html/index.html'));
    } catch (error) {
        res.status(500).json({ error: 'Could not load file.' });
    }
}

export const viewPackages = async (req: Request, res: Response): Promise<void> => {
    try {
        const packages = await PackageImpl.selectAll();
        if(!packages){
            res.json({ packages: [] });
            return;
        }
        const oneDay = packages.one.map(pkg => ({ ...pkg, shipping_method: 1 }));
        const twoDay = packages.two.map(pkg => ({ ...pkg, shipping_method: 2 }));

        const allPackages = [...oneDay, ...twoDay];
        allPackages.sort((a, b) => a.id - b.id);
        res.json({ packages: allPackages });
    } catch (error) {
        console.error('Error fetching packages:', error);
        res.status(500).json({ err: 'Error Fetching packages.' });
    }
}

export const addPackage = async (req: Request, res: Response): Promise<void> => {
    const { retailer_id, customer_id, shipping_method, package_weight, cost_weight } = req.body;
    try {
        const selectPackage = await PackageImpl.addPackage(retailer_id, customer_id, shipping_method, package_weight, cost_weight);
        selectPackage.savePackage();
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: 'Error Fetching packages.' });
    }
}

export const editPackage = async (req: Request, res: Response): Promise<void> => {
    const { id, retailer_id, customer_id, status_id, tracking_number, package_weight, cost_weight } = req.body;
    let selectPackage;
    try {
        selectPackage = await PackageImpl.selectById(id);
        if(selectPackage){
            await selectPackage.editPackage(id, retailer_id, customer_id, status_id, tracking_number, package_weight, cost_weight);
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: 'Error editing package.' });
    }
}

export const updatePackage = async (req: Request, res: Response): Promise<void> => {
    const { id, status_id } = req.body;
    try {
        const selectPackage = await PackageImpl.selectById(id);
        if(selectPackage){
            await selectPackage.updatePackage(status_id);
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: 'Error Fetching packages.' });
    }
}

export const deletePackage = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.body;
    try {
        const selectPackage = await PackageImpl.selectById(id);
        if(selectPackage){
            await selectPackage.deletePackage();
        }
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: 'Error deleting package.' });
    }
}

export const printPackage = async (req: Request, res: Response): Promise<void> => {
    let {id} = req.params;
    let convertId = parseInt(id, 10);
    try {
        const selectPackage = await PackageImpl.selectById(convertId);
        res.json({ package: selectPackage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: 'Error printing package.' });
    }
}

export const calculatePackage = async (req: Request, res: Response): Promise<void> => {
    let {id} = req.params;
    let convertId = parseInt(id, 10);
    try {
        const selectPackage = await PackageImpl.selectById(convertId);
        if(selectPackage){
            const result = await selectPackage.calculatePackage();
            res.json({ package: result });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ err: 'Error deleting package.' });
    }
}