const Position = require("../Models/Position")

const createTypePos = (newPosition)=>{
    return new Promise(async(resolve, reject)=>{
        const {posId, posName}  = newPosition
        try{
            const checkPosition = await Position.findOne({
                posId: posId
            })

            if(checkPosition!==null){
                reject({
                    status: 'ERR',
                    message: 'The Position is already'
                })
            }

            if(checkPosition===null){
                const newPosition = await Position.create({
                    posId, 
                    posName
                })
                if(newPosition){
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: newPosition
                    })
                }
            }
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createTypePos,
}
