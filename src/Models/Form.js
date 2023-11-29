const mongoose = require('mongoose')
const formSchema = new mongoose.Schema(
    {
        formId: { type: String, required: true },
        formName: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const FormAdvertising = mongoose.model("FormAdvertising", formSchema);
module.exports = FormAdvertising;