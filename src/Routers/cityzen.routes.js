import  Router from "express";
const router = Router();
import Point from '../Models/Point.js';
//tạm thời để ở cityzen sau này xóa sau

router.post('/uploadPoint', async (req,res) => {
    try {
        const newPoint = new Point(req.body);
        const point = newPoint.save();
        res.status(200).json(point);

    } catch (err) {
        res.json(500).json(err);
    }
})


export default router;