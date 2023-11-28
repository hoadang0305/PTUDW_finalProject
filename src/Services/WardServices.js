const Ward = require("../Models/Ward")

const createWard = (newWard)=>{
    return new Promise(async(resolve, reject)=>{
        const {wardId, wardName}  = newWard
        try{
            const checkWard = await Ward.findOne({
                wardId: wardId
            })

            if(checkWard!==null){
                resolve({
                    status: 'OK',
                    message: 'The Ward is already'
                })
            }

            if(checkWard===null){
                const newWard = await Ward.create({
                    wardId, 
                    wardName
                })
                if(newWard){
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: newWard
                    })
                }
            }
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createWard,
}