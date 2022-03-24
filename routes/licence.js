import express from 'express'

import {getLicenceList, createLicence, deleteLicence, activateLicence, checkLicence} from '../controllers/licence.js'


const router = express.Router();


router.get('/', getLicenceList)
router.post('/', createLicence)
router.post('/activate/:ref/:serial', activateLicence)
router.get('/check/:ref/:serial', checkLicence)
router.delete('/:id', deleteLicence)


export default router;