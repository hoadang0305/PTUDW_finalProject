const Point = require("../Models/Point");
const Ward = require("../Models/Ward");
const District = require("../Models/District");

const createPoint = (newPoint)=>{
    return new Promise(async(resolve, reject)=>{
        const {address, area, locate, positionType, formAdvertising, picturePoint, isZoning} = newPoint
        try{
            const checkPoint = await Point.findOne({
                address: address
            });

            if(checkPoint!==null){
                resolve({
                    status: 'OK',
                    message: 'The Point is already'
                })
            }

            if(checkPoint===null){
                const {wardId, disId} = area;
                const ward = await Ward.findOne({ wardId:wardId  });
                const district = await District.findOne({ disId: disId });
                console.log(district.disName);
                if (!ward || !district) {
                    return res.status(400).json({
                        status: 'ERR',
                        message: 'Ward or district not found.',
                    });
                }
                const newPoint = await Point.create({
                    address, 
                    area, 
                    locate,
                    positionType, 
                    formAdvertising, 
                    picturePoint,
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

const updatePoint = (id, data)=>{
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
           const updatePoint = await Point.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status: 'OK',
                message: 'Update Point success',
                data: updatePoint
            })
        }catch(e){
            reject(e)
        }
    })
}
module.exports = {
    createPoint,
    getAllPoint,
    deletePoint,
    updatePoint
}