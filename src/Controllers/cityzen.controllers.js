const PointService = require('../Services/cityzen.services')

const createPoint= async(req,res)=>{
    try{
        const {address, area, locate, positionType, formAdvertising, picturePoint, isZoning} = req.body
        const reg =  /\/d\/(.+?)\//;
        const isCheckPicture = reg.test(picturePoint)

        if(!address || !area || !locate || !positionType || !formAdvertising || !picturePoint || !isZoning){
            return res.status(200).json({
                status: 'ERR',
                messgae: 'The input is required'
            })
        }else if(!isCheckPicture) {
            return res.status(200).json({
                status: 'ERR',
                messgae: 'The input picture Point is link Google Drive'
            })
        }
        const response = await PointService.createPoint(req.body)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const getAllPoint = async(req,res)=>{
    try{
        const response = await PointService.getAllPoint()
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

const deletePoint = async(req,res)=>{
    try{
        const pointId = req.params.id
        //const token = req.headers
        if(!pointId){
            return res.status(200).json({
                status: 'ERR', 
                message: 'The pointId is required'
            })
        }

        const response = await PointService.deletePoint(pointId)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createPoint,
    getAllPoint,
    deletePoint
}