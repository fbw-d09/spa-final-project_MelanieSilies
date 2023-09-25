import Stellplatz from '../models/stellplaetzeModel.js';
import mongoose from 'mongoose';
import Chance from 'chance';
const chance = new Chance();

export const getStellplaetze = (req,res) => {
    console.log('Alle Stellplätze angezeigt');
    Stellplatz
        .find()
        .then(stellplaetze => {
            res.status(200).json({
                success:true,
                amount: stellplaetze.length,
                data: stellplaetze
            });
        })
        .catch(err => console.log(err.message));
};

export const createStellplatz = (req,res) => {
    const newStellplatz = 
    {
    lat: chance.altitude({ fixed: 7 }),
    lan: chance.longitude({fixed: 7}),
    name: chance.street(),
    website: chance.url(),
    ueber: chance.paragraph({ sentences: 1 }),
    tipp: chance.paragraph({ sentences: 1 }),
    preis: chance.euro({max: 50}),
    Strom: chance.euro({max: 2}),
    wasser: chance.euro({max: 2}),
    restaurant:chance.bool(),
    plaetze: chance.integer({ min: 2, max: 150 }),
    reservierung: chance.bool(),
    wlan: chance.bool(),
    toilettenentsorgung: chance.bool(),
    abwasserentsorgung: chance.bool(),
    toiletten: chance.bool(),
    duschen: chance.bool(),
    hunde: chance.bool(),
    kinder: chance.bool(),
    einkaufsmöglichkeiten:chance.bool(),
    wintercamping:chance.bool(),
    gasflaschenservice:chance.bool(),
    baecker:chance.bool()
}
Stellplatz.create(newStellplatz)
    console.log('Neuer Stellplatz generiert')
    .then(stellplatz => {
        res.status(201).json({
            success:true,
            data: stellplatz
        })
    })
    .catch(err => {
        res.status(500).json({
            success: false,
            message:' Fehler beim Erstellen des Stellplatzes'
        })
    })
}


export const deleteStellplatz = (req, res) => {
    console.log('Stellplatz gelöscht');
    const id= req.params.id;
    Stellplatz
        .findByIdAndDelete(id)
        .then(stellplatz => {
            res.json({
                success:true,
                deleted: stellplatz !== null ? true : false,
                data: stellplatz
            })
        })
}