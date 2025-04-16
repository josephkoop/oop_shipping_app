import express, { Router } from 'express';
import path from 'path';
import { index, viewPackages, addPackage, editPackage, updatePackage, deletePackage, printPackage, calculatePackage } from '../controllers/controller';

const router = express.Router();

router.get('/', index);
router.get('/packages', viewPackages);
router.post('/add', addPackage);
router.post('/edit', editPackage);
router.post('/update', updatePackage);
router.post('/delete', deletePackage);
router.get('/print/:id', printPackage);
router.get('/calculate/:id', calculatePackage);

export default router;