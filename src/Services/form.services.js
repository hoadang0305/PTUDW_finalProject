const FormAdvertising = require("../Models/Form")

const createForm = (newForm)=>{
    return new Promise(async(resolve, reject)=>{
        const {formId, formName}  = newForm
        try{
            const checkForm = await FormAdvertising.findOne({
                formId: formId
            })

            if(checkForm!==null){
                reject({
                    status: 'ERR',
                    message: 'The FormAdvertising is already'
                })
            }

            if(checkForm===null){
                const newForm = await FormAdvertising.create({
                    formId, 
                    formName
                })
                if(newForm){
                    resolve({
                        status: 'OK',
                        message: 'SUCCESS',
                        data: newForm
                    })
                }
            }
        }catch(e){
            reject(e)
        }
    })
}

module.exports = {
    createForm,
}
