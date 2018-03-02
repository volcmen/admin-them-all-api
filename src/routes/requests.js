import { Router } from 'express';
import Sites from '../models/Sites-DB';
import { User } from '../models/User';
import universalRouter from './universalRouter';

const router = Router();

router.get('/getSites', (req, res) => {
    Sites.find({ status: 'Active' }, (err, data) => {
        if (err) throw err;
        res.status(200).json(data);
    });
});

router.use('/', universalRouter('Article'));
router.use('/', universalRouter('BasicInfoDocument'));
router.use('/', universalRouter('BasicInfo'));
router.use('/', universalRouter('Carousel'));
router.use('/', universalRouter('Document'));
router.use('/', universalRouter('DopInfo'));
router.use('/', universalRouter('EdMedalist'));
router.use('/', universalRouter('EdMethWork'));
router.use('/', universalRouter('Education'));
router.use('/', universalRouter('FinancialSupport'));
router.use('/', universalRouter('FinAndEcoActivity'));
router.use('/', universalRouter('FinAndEconAct'));
router.use('/', universalRouter('GoverningBodie'));
router.use('/', universalRouter('GoverningFile'));
router.use('/', universalRouter('HowToFindInfo'));
router.use('/', universalRouter('IncorpDocument'));
router.use('/', universalRouter('LocalRegulationsDocument'));
router.use('/', universalRouter('Logistic'));
router.use('/', universalRouter('PaidEdService'));
router.use('/', universalRouter('Personnel'));
router.use('/', universalRouter('ReceptionIn'));

router.put('/updateUserSite', (req, res) => {
    User.findOneAndUpdate({ email: req.body.email }, { $set: { lastUsedSite: req.body.lastUsedSite, dateUpdated: new Date() } }, (err, user) => {
        if (err) throw err;
        if (!user || !req.body.lastUsedSite) return res.status(409).end('Wrong @ || !site');

        res.status(200).end('Updated');
    });
});

export default router;
