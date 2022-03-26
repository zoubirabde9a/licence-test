import { request } from 'express';
import LicenceData from '../model/licence.js'

export const getLicenceList = async (req, res) =>
{
    try
    {
        const licenceList = await LicenceData.find();

        res.status(200).json(licenceList);
    }
    catch(error)
    {
        res.status(404).json({message: error.message});
    }
}

export const createLicence = async (req, res) =>
{
    const requestLicence = new LicenceData(req.body);

    requestLicence.start = new Date();
    requestLicence.end = new Date();
    requestLicence.end.setDate(requestLicence.start.getDate() + requestLicence.days);

    requestLicence.status = 0;

    try
    {
        await requestLicence.save();
        res.status(201).json(requestLicence);
    }
    catch (error)
    {
        res.status(409).json({message: error.message});
    }
}

export const activateLicence = async (req, res) =>
{
    const ref = req.params.ref;
    const serial = req.params.serial;

    try
    {
        LicenceData.findOne({ref: ref})
        .then(licence => {
            if (licence.status != 1)
            {
                licence.status = 1;
                licence.serial = serial;
                licence.start = new Date();
                licence.end = new Date();
                licence.end.setDate(licence.start.getDate() + licence.days);

                LicenceData.updateOne({ref: ref}, licence)
                .then(updatedLicence => res.status(201).json(licence))
                .catch(err => {
                    var errorMessage = "Error: Cannot Update";
                    console.log(errorMessage);
                    res.status(409).send(errorMessage);
                })
            }
            else
            {
                var errorMessage = "Error: Licence Already Active";
                console.log(errorMessage);
                res.status(409).send(errorMessage);  
            }
        })
        .catch(err => {
            var errorMessage = "Error : Ref not found";
            console.log(errorMessage);
            res.status(409).send(errorMessage);
        });
    
    }
    catch(error)
    {
        console.log(error);
        res.status(409).json({message: error.message});
    }

}


export const checkLicence = async (req, res) =>
{
    const ref = req.params.ref;
    const serial = req.params.serial;

    try
    {
        LicenceData.findOne({ref: ref})
        .then(licence => {
            var thisDate = new Date();
            if (licence.status == 1 &&
                thisDate.getTime() >= licence.start.getTime() &&
                thisDate.getTime() < licence.end.getTime())
            {
                if (licence.serial == serial)
                {
                    var daysLeft = (licence.end.getTime() - thisDate.getTime()) / (1000*60*60*24);
                    console.log("licence " + licence.end.getTime());
                    console.log("now " + thisDate.getTime());
                    console.log("diff " + ((licence.end.getTime() - thisDate.getTime()) / (1000*60*60*24)));
                    res.status(200).json({daysLeft: daysLeft});
                }
                else
                {
                    var errorMessage = "Error : Wrong Serial";
                    console.log(errorMessage);
                    res.status(409).send(errorMessage);
                }
            }
            else
            {
                var errorMessage = "Error : Licence Is Not Active or expired";
                console.log(errorMessage);
                res.status(409).send(errorMessage);
            }
        })
        .catch(err => {
            var errorMessage = "Error : Ref not found";
            console.log(errorMessage);
            res.status(409).send(errorMessage);
        })
    }
    catch(error)
    {
        var errorMessage = "Error : Ref not found";
        console.log(errorMessage);
        res.status(409).send(errorMessage);
    }

}

export const deleteLicence = async (req, res) =>
{
    const ref = req.params.ref;

    try
    {
        await LicenceData.findOneAndRemove({ref:ref}).exec();
        res.send('Success');
    }
    catch(error)
    {
        console.log(error);
    }

}



export const deleteLicenceByRef = async (req, res) =>
{
    const ref = req.params.ref;

    try
    {
        await LicenceData.deleteOne({ref: ref});
        res.send('Success');
    }
    catch(error)
    {
        console.log(error);
    }

}