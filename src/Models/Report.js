const mongoose = require('mongoose')
const reportSchema = new mongoose.Schema(
    {
        timeSend: {type: Date, require: true},
        reportType: {type: String, require:true},
        //reporter info
        name: {type: String, require: true},
        email: {type: String, require:true, unique: true},
        phone: {type: String, require: true},
        // nội dung báo cáo
        content: {type: String, require: true},
        //dùng multer để lưu về máy
        ReportPicture: {type: String, require: true},

        isDone: {type: String, require: true},

        access_token: {type: String, require: true},
        refresh_token: {type: String, require: true},
        // isDistrict: {type: Boolean, default: false, require: true},
        // isWard: {type: Boolean, default: false, require: true},
        // isService: {type: Boolean, default: false, require: true},
    },
    {
        timestamps: true,
    }
);

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;