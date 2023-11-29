const Point = require("../Models/Point");
const Ward = require("../Models/Ward");
const District = require("../Models/District");
const Position = require("../Models/Position");
const FormAdvertising = require("../Models/Form");

const createPoint = (newPoint)=>{
    return new Promise(async(resolve, reject)=>{
        const {address, area, locate, positionType, formAdvertising, picturePoint, isZoning} = newPoint
        console.log(newPoint)
        try{
            const checkPoint = await Point.findOne({
                address: address
            });

            if(checkPoint!==null){
                reject({
                    status: 'ERR',
                    message: 'The Point is already'
                })
            }

            if(checkPoint === null){

                const wardId= area.ward;
                const disId= area.district;
                const posId = positionType;
                const formId = formAdvertising

                const ward = await Ward.findOne({ wardId: wardId });
                if (ward === null) {
                    reject({ 
                        status: 'ERR',
                        message: 'Ward not found'
                    });
                }

                const district = await District.findOne({ disId: disId });
                if (district ===null) {
                    reject({
                        status: 'ERR',
                        message: 'District not found'
                    });
                }

                const position = await Position.findOne({ posId });
                if (position ===null) {
                    reject({
                        status: 'ERR',
                        message: 'Position not found'
                    });
                }

                const formAdver = await FormAdvertising.findOne({ formId });
                if (formAdver ===null) {
                    reject({
                        status: 'ERR',
                        message: 'Form Advertising not found'
                    });
                }

                if(ward!==null && district!==null && position!==null && formAdver!==null){
                    const newPointData = {
                        address,
                        //area: { ward: ward.wardName, district: district.disName },
                        area: { ward: ward.wardId, district: district.disId },
                        locate,
                        positionType: position.posId,
                        formAdvertising: formAdver.formId,
                        picturePoint,
                        isZoning
                    };
    
                    const newPoint = await Point.create(newPointData);
                    // // Populate the ward and district fields
                    // await Point.populate(newPoint, { path: 'area.ward' });
                    // await Point.populate(newPoint, { path: 'area.district' });
    
                    if (newPoint) {
                        resolve({
                            status: 'OK',
                            message: 'SUCCESS',
                            data: newPoint
                        });
                    }
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
            const allPoint = await Point.find();
            const updatePoints = await Promise.all(

                allPoint.map(async (point) =>{
                const newPoint = {...point.toObject()};

                const ward = await Ward.findOne({ wardId: newPoint.area.ward });
                const district = await District.findOne({ disId: newPoint.area.district });
                const position = await Position.findOne({posId: newPoint.positionType});
                const form = await FormAdvertising.findOne({formId: newPoint.formAdvertising});

                newPoint.area = {ward: ward.wardName,district: district.disName};
                newPoint.positionType = position.posName
                newPoint.formAdvertising = form.formName

                return newPoint;
            }));
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatePoints

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