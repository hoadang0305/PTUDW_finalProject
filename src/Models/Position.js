const mongoose = require('mongoose')
const posSchema = new mongoose.Schema(
    {
        posId: { type: String, required: true },
        posName: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

const Position = mongoose.model("Position", posSchema);
module.exports = Position;