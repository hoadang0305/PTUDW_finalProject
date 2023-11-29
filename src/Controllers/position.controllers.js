const PositionService = require('../Services/position.services')

const createTypePos= async(req,res)=>{
    try{
        const {posId, posName} = req.body

        if(!posId || !posName ){
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await PositionService.createTypePos(req.body)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createTypePos
}
