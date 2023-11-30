const mongoose = require('mongoose')
const pointSchema = new mongoose.Schema(
    {
        // địa chỉ cụ thể
        address: {type: String, require: true},
        // quận - phường
        area: 
            {
                // ward: { type: mongoose.Schema.Types.ObjectId, ref: 'Ward', required: true },
                // district: { type: mongoose.Schema.Types.ObjectId, ref: 'District', required: true }
                ward: { type: String, required: true },
                district: { type: String, required: true }
            },
        // kinh - vĩ độ
        locate: {type: Array, require: true},
        // Loại vị trí
        positionType: { type: String, require: true },
        //Loại hình quảng cáo
        formAdvertising: {type: String, require: true},// object

        picturePoint: {type: String, require: true},//"https://drive.google.com/uc?id=your_file_id"
        // đã quy hoạch chưa
        isZoning: {type: Boolean,default:false, require: true},

        panels: {type: Array,  ref: 'Panel', require: false},

    },
    {
        timestamps: true,
    }
);

const Point = mongoose.model("Point", pointSchema);
module.exports = Point;
