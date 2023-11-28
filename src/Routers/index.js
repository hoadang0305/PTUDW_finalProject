const PointRouter = require('./cityzen.routes')
const WardRouter = require('./WardRoutes')
const DistrictRouter = require('./DistrictRoutes')

const routes = (app) =>{
    app.use('/api/cityzen', PointRouter)
    app.use('/api/ward',WardRouter)
    app.use('/api/district',DistrictRouter)
}

module.exports = routes