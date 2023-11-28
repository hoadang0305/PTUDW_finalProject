const District = require("../Models/District")

const createDistrict = (newDistrict)=>{
    return new Promise(async(resolve, reject)=>{
        const {disId, disName}  = newDistrict
        try{
            const checkDistrict = await District.findOne({
                disId: disId
            })

            if(checkDistrict!==null){
                resolve({
                    status: 'OK',
                    message: 'The District is already'
                })
            }

            if(checkDistrict===null){
                const newDistrict = await District.create({
                    disId, 
                    disName
                })
                if(newDistrict){
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: newDistrict
                    })
                }
            }
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createDistrict,
}