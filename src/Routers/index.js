const PointRouter = require('./point.routes')
const WardRouter = require('./ward.routes')
const DistrictRouter = require('./district.routes')

const routes = (app) =>{
    // đường dẫn dùng cho cityzen
    app.use('/api/cityzen', PointRouter)
    app.use('/api/ward',WardRouter)
    app.use('/api/district',DistrictRouter)
}

module.exports = routes