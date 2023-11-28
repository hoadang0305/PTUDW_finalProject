const WardService = require('../Services/WardServices')

const createWard= async(req,res)=>{
    try{
        const {wardId, wardName} = req.body

        if(!wardId || !wardName ){
            return res.status(200).json({
                status: 'ERR',
                messgae: 'The input is required'
            })
        }
        const response = await WardService.createWard(req.body)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createWard
}