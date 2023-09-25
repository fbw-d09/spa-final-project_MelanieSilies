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
        reservierung: Boolean,
        toiletten: Boolean,
        hunde: Boolean,
        kinder: Boolean,
        zeiten: String,
        barrierefrei: Boolean
    },
    {
        timestamps: true
    }
);

const poiModel = new model( 'POI', schema, 'pois')

export default poiModel;