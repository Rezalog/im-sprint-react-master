const flights = require('../repository/flightList');

module.exports = {
  // [GET] /flight
  // 요청 된 departure_times, arrival_times, destination, departure 값과 동일한 값을 가진 항공편 데이터를 조회합니다.
  findAll: (req, res) => {
    // TODO:
    // 1-1. departure_times O
    if(req.query.departure_times !== undefined && req.query.arrival_times === undefined) {
      const _flights = flights.filter((el) => {
        return el.departure_times === req.query.departure_times;
      })
      return res.status(200).json(_flights);
    } 
    // 1-2. departure_times X, arrival_times O
    else if(req.query.departure_times === undefined && req.query.arrival_times !== undefined) {
      const _flights = flights.filter((el) => {
        return el.arrival_times === req.query.arrival_times;
      })
      return res.status(200).json(_flights);
    }
    // 1-3. departure_times O, arrival_times O
    else if(req.query.departure_times !== undefined && req.query.arrival_times !== undefined) {
      const _flights = flights.filter((el) => {
        return el.departure_times === req.query.departure_times && el.arrival_times === req.query.arrival_times;
      })
      return res.status(200).json(_flights);
    }
    // 2-1. destination O, departure X
    else if(req.query.destination !== undefined && req.query.departure === undefined) {
      const _flights = flights.filter((el) => {
        return el.destination === req.query.destination;
      })
      return res.status(200).json(_flights);
    }
    // 2-2. destination X, departure O
    else if(req.query.destination === undefined && req.query.departure !== undefined) {
      const _flights = flights.filter((el) => {
        return el.departure === req.query.departure;
      })
      return res.status(200).json(_flights);
    }
    // 2-3. destination O, departure O
    else if(req.query.destination !== undefined && req.query.departure !== undefined) {
      const _flights = flights.filter((el) => {
        return el.destination === req.query.destination && el.departure === req.query.departure;
      })
      return res.status(200).json(_flights);
    }
    // 3. 모두 X
    return res.json(flights);
  },
  // [GET] /flight/:id
  // 요청 된 id 값과 동일한 uuid 값을 가진 항공편 데이터를 조회합니다.
  findById: (req, res) => {
    // TODO:
    if(req.params.id !== undefined) {
      const _flights = flights.filter((el) => {
        return el.uuid === req.params.id;
      })
      return res.status(200).json(_flights);
    }

  },

  // [PUT] /flight/:id 요청을 수행합니다.
  // 요청 된 id 값과 동일한 uuid 값을 가진 항공편 데이터를 요쳥 된 Body 데이터로 수정합니다.
  update: (req, res) => {
    // 1. data에 요청한 id와 동일한 id의 데이터를 담음
    let data = flights.filter((el) => {
      return el.uuid === req.params.id;
    });

    // 2. req.body에 요청된 body 데이터로 수정
    for(let i=0; i<data.length; i++) {
      data[i].departure_times = req.body.departure_times;
      data[i].departure = req.body.departure;
      data[i].arrival_times = req.body.arrival_times;
      data[i].destination = req.body.destination;
    }

    return res.status(200).json(...data);
  }
};
