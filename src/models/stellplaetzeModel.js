import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const schema = new Schema(
    {
        lat:Number,
        lan: Number,
        name: String,
        website: String,
        ueber: String,
        tipp: String,
        preis: Number,
        Strom: String,
        wasser: String,
        restaurant:String,
        plaetze: Number,
        reservierung: Boolean,
        wlan: Boolean,
        toilettenentsorgung: Boolean,
        abwasserentsorgung: Boolean,
        toiletten: Boolean,
        duschen: Boolean,
        hunde: Boolean,
        kinder: Boolean,
        einkaufsmöglichkeiten:Boolean,
        wintercamping:Boolean,
        gasflaschenservice:Boolean,
        baecker:Boolean
    },
    {
        timestamps: true
    }
);

const stellplaetzeModel = new model( 'Stellplatz', schema, 'stellplaetze')

export default stellplaetzeModel;