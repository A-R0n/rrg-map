const getAllBasicRouteInfo = (req, res, next) => {
    req.app
        .get('db')
        .get_basic_route_info()
        .then((response) => {
            res.status(200).send(response);
        })
        .catch(err => res.status(500).send(err))
};

const getParkingLotId = (req, res, next) => {
    req.app
        .get('db')
        .get_parkinglot([req.params.parkinglotid])
        .then(response => res.status(200).send(response))
        .catch(err => res.status(500).send(err))
};
module.exports = {
    getParkingLotId,
    getAllBasicRouteInfo
}