const FormService = require('../Services/form.services')

const createForm= async(req,res)=>{
    try{
        const {formId, formName} = req.body

        if(!formId || !formName ){
            return res.status(404).json({
                status: 'ERR',
                message: 'The input is required'
            })
        }
        const response = await FormService.createForm(req.body)
        return res.status(200).json(response)
    }catch(e){
        return res.status(404).json({
            message: e
        })
    }
}

module.exports = {
    createForm
}

