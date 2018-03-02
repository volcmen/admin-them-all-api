import { Router } from 'express';
import mongoose from 'mongoose';

/* eslint-disable no-unused-vars */
import Articles from '../models/Articles';
import BasicInfoDocuments from '../models/BasicInfoDocuments';
import BasicInfos from '../models/BasicInfos';
import Carousels from '../models/Carousels';
import Documents from '../models/Documents';
import DopInfos from '../models/DopInfos';
import EdMedalists from '../models/EdMedalists';
import EdMethWorks from '../models/EdMethWorks';
import Educations from '../models/Educations';
import FinancialSupports from '../models/FinancialSupports';
import FinAndEcoActivitys from '../models/FinAndEcoActivitys';
import FinAndEconActs from '../models/FinAndEconActs';
import GoverningBodies from '../models/GoverningBodies';
import GoverningFiles from '../models/GoverningFiles';
import HowToFindInfos from '../models/HowToFindInfos';
import IncorpDocuments from '../models/IncorpDocuments';
import LocalRegulationsDocs from '../models/LocalRegulationsDocs';
import Logistics from '../models/Logistics';
import PaidEdServices from '../models/PaidEdServices';
import Personnels from '../models/Personnels';
import ReceptionIns from '../models/ReceptionIns';
/* eslint-enable no-unused-vars */


import { getAuthedUserName } from '../app';

const router = Router();

const routerDynamic = (route) => {
    router.get(`/get${route}s`, (req, res) => {
        const link = req.header('Link');
        if (!link) return res.status(400).end('Wrong request params');

        const db = mongoose.createConnection(link);

        return db.once(
            'open', () => {
                db.model(`${route}s`).find({}, (err, result) => {
                    db.close();
                    if (err) throw err;
                    return res.status(200).json(result);
                });
            },
            (err) => {
                db.close();
                throw err;
            },
        );
    });

    router.get(`/get${route}/:id`, (req, res) => {
        const link = req.header('Link'),
            { id } = req.params;
        if (!link || !id) return res.status(400).end('Wrong request params');

        const db = mongoose.createConnection(link);

        return db.once(
            'open', () => {
                db.model(`${route}s`).findById(id, (err, result) => {
                    db.close();
                    if (err) throw err;
                    return res.status(200).json(result);
                });
            },
            (err) => {
                db.close();
                throw err;
            },
        );
    });

    router.post(`/update${route}/:id`, (req, res) => {
        const link = req.header('Link'),
            { id } = req.params;
        const AuthedUserName = getAuthedUserName();
        if (!link || !id) return res.status(400).end('Wrong request params');
        if (!req.body) return res.status(400).end('No body');
        if (!AuthedUserName) return res.status(401).end('Auth wrong');

        const db = mongoose.createConnection(link);

        return db.once(
            'open', () => {
                req.body.updatedBy = AuthedUserName;
                if (id === 'new') {
                    delete req.body._id;
                    req.body.createdBy = AuthedUserName;
                    req.body.dateCreated = new Date();
                    const DBModel = db.model(`${route}s`);
                    const itemToSave = new DBModel(req.body);
                    return itemToSave.save((err, result) => {
                        db.close();
                        if (err) throw err;
                        return res.status(200).json(result);
                    });
                }
                return db.model(`${route}s`).findByIdAndUpdate(id, { $set: req.body }, (err, result) => {
                    db.close();
                    if (err) throw err;
                    return res.status(200).json(result);
                });
            },
            (err) => {
                db.close();
                throw err;
            },
        );
    });

    router.delete(`/delete${route}/:id`, (req, res) => {
        const link = req.header('Link'),
            { id } = req.params;
        if (!link || !id) return res.status(400).end('Wrong request params');
        if (!req.body) return res.status(400).end('No body');

        const db = mongoose.createConnection(link);

        return db.once(
            'open', () => {
                db.model(`${route}s`).findByIdAndUpdate(id, { $set: { status: 'Deleted' } }, (err, result) => {
                    db.close();
                    if (err) throw err;
                    return res.status(200).json(result);
                });
            },
            (err) => {
                db.close();
                throw err;
            },
        );
    });

    return router;
};

export default routerDynamic;
