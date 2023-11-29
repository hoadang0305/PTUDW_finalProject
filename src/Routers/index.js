const PointRouter = require('./point.routes')
const WardRouter = require('./ward.routes')
const DistrictRouter = require('./district.routes')
const PositionRouter = require('./position.routes')
const FormRouter = require('./form.routes')

const routes = (app) =>{
    // đường dẫn dùng cho cityzen
    app.use('/api/point', PointRouter)
    app.use('/api/ward',WardRouter)
    app.use('/api/district',DistrictRouter)
    app.use('/api/position', PositionRouter)
    app.use('/api/form', FormRouter)
}

module.exports = routes