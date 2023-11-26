const Point = require("../Models/Point")

const extractFileIdFromUrl = (url) => {
    const fileIdRegex = /\/d\/(.+?)\//;
    const match = url.match(fileIdRegex);
    return match ? match[1] : null;
};

const createPoint = (newPoint)=>{
    return new Promise(async(resolve, reject)=>{
        const {address, area, locate, positionType, formAdvertising, picturePoint, isZoning} = newPoint
        try{
            const checkPoint = await Point.findOne({
                address: address
            })

            if(checkPoint!==null){
                resolve({
                    status: 'OK',
                    message: 'The Point is already'
                })
            }

            const fileId = extractFileIdFromUrl(picturePoint);

            if(checkPoint===null){
                const newPoint = await Point.create({
                    address, 
                    area, 
                    locate, 
                    positionType, 
                    formAdvertising, 
                    picturePoint: fileId,
                    isZoning
                })
                if(newPoint){
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: newPoint
                    })
                }
            }
        }catch(e){
            reject(e)
        }
    })
}

const getAllPoint = ()=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const allPoint = await Point.find()
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: allPoint

            })
        }catch(e){
            reject(e)
        }
    })
}

const deletePoint = (id)=>{
    return new Promise(async(resolve, reject)=>{
        try{
            const checkPoint = await Point.findOne({
                _id: id
            })
            if(checkPoint === null){
                resolve({
                    status: 'OK',
                    message: 'The Point is not defined'
                })
            }
            await Point.findByIdAndDelete(id)
            resolve({
                status: 'OK',
                message: 'Delete Point success',
            })
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createPoint,
    getAllPoint,
    deletePoint
}