const mongoose = require('mongoose')
const panelSchema = new mongoose.Schema(
    {
        //idPoint: {type: mongoose.Schema.Types.ObjectId,  ref: 'Point', require: true},

        idPanel: {type: String, require: true},
        // longitude: {type: String, require: true},
        // latitude: {type: String, require: true},
        // loại bảng quảng cáo
        Paneltype: {type: String, require: true},
        amount: {type: Number, require: true},
        size: {type: String, require: true},// 2.3m x 10m
        picturePanel: {type: String, require: true},
        //ngày hết hạn
        expDate: {type: String, require: true},

        access_token: {type: String, require: true},
        refresh_token: {type: String, require: true},
        //isService: {type: Boolean, default: false, require: true},
    },
    {
        timestamps: true,
    }
);

const Panel = mongoose.model("Panel", panelSchema);
module.exports = Panel;