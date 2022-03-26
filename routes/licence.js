import express from 'express'

import {getLicenceList, createLicence, deleteLicence, activateLicence, checkLicence, getLicenceListPage, getLicenceListCount} from '../controllers/licence.js'


const router = express.Router();


router.get('/', getLicenceListPage)
router.get('/count', getLicenceListCount)
router.post('/', createLicence)
router.post('/activate/:ref/:serial', activateLicence)
router.get('/check/:ref/:serial', checkLicence)
router.delete('/:ref', deleteLicence)


export default router;