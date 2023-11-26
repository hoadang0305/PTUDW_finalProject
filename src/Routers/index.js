const PointRouter = require('./cityzen.routes')

const routes = (app) =>{
    app.use('/api/cityzen', PointRouter)
}

module.exports = routes