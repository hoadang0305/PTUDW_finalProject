const mongoose = require('mongoose')
const pointSchema = new mongoose.Schema(
    {
        // địa chỉ cụ thể
        address: {type: String, require: true},
        // quận - phường
        area: {type: String, require: true},
        // kinh - vĩ độ
        locate: {type: Array, require: true},
        // Loại vị trí
        positionType: {type: String, require: true},
        //Loại hình quảng cáo
        formAdvertising: {type: String, require: true},// object
        picturePoint: {type: String, require: true},//"https://drive.google.com/uc?id=your_file_id"
        // đã quy hoạch chưa
        isZoning: {type: Boolean,default:false, require: true},

        panels: [{type: mongoose.Schema.Types.ObjectId,  ref: 'Panel', require: false}],

        //access_token: {type: String, require: true},
        //refresh_token: {type: String, require: true},
        //isService: {type: String, require: true},
    },
    {
        timestamps: true,
    }
);

const Point = mongoose.model("Point", pointSchema);
module.exports = Point;
