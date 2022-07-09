const flights = require('../repository/flightList');
// 항공편 예약 데이터를 저장합니다.
let booking = [];

module.exports = {
  // [GET] /book 요청을 수행합니다.
  // 전체 데이터 혹은 요청 된 flight_uuid, phone 값과 동일한 예약 데이터를 조회합니다.
  findById: (req, res) => {
    // TODO:
    // 1-1. flight_uuid O, phone X
    if(req.query.flight_uuid !== undefined) {
      const _booking = booking.filter((el) => {
        return el.flight_uuid === req.query.flight_uuid;
      })
      return res.status(200).json(_booking);
    }
    // 1-2. flight_uuid X, phone O
    else if(req.query.phone !== undefined) {
      const _booking = booking.filter((el) => {
        return el.phone === req.query.phone;
      })
      return res.status(200).json(..._booking);
    }
    
    // 1-3. flight_uuid O, phone O
    // if(req.query.flight_uuid !== undefined && req.query.phone !== undefined) {
    //   const _booking = flights.filter((el) => {
    //     return el.flight_uuid === req.query.flight_uuid && el.phone === req.query.phone;
    //   })
    //   return res.status(200).json(_booking);
    // }

    // 2. others
    return res.status(200).json(booking);
  },

  // [POST] /book 요청을 수행합니다.
  // 요청 된 예약 데이터를 저장합니다.
  // 응답으로는 book_id를 리턴합니다.
  // Location Header로 예약 아이디를 함께 보내준다면 RESTful한 응답에 더욱 적합합니다.
  // 참고 링크: https://www.vinaysahni.com/best-practices-for-a-pragmatic-restful-api#useful-post-responses
  create: (req, res) => {
    // TODO:

    // 1. request.body 을 예약내용을 booking에 push 해준다(flight_uuid, name, phone 데이터가 담긴 객체를 저장하고있어야한다(예약내용))
    // 2. Entity Header 인 loation Header를 이용하여 /book/`${flight_uuid}` 형태로 redirect 될 수 있도록 한다.
    
    if(req.body.flight_uuid !== undefined && req.body.name !== undefined && req.body.phone !== undefined) {
      req.body = {
        flight_uuid : req.body.flight_uuid,
        name : req.body.name,
        phone : req.body.phone
      };
      booking.push(req.body);
      return res.status(201).json({msg : '예약 성공', 예약정보 : JSON.stringify(booking)});
    } 
    else {
      return res.status(400).json({msg : '예약 실패 : 예약 정보를 확인하세요.'})
    }

    // res.location(`/book/${req.query.flight_uuid}`);
  },

  // [DELETE] /book?phone={phone} 요청을 수행합니다.
  // 요청 된 phone 값과 동일한 예약 데이터를 삭제합니다.
  deleteById: (req, res) => {
    // TODO:
    if(req.query.phone !== undefined) {
      let _booking = booking.filter((el) => {
        return el.phone !== req.query.phone;
      })
      booking = _booking;
    }
    return res.status(200).json(booking);
  }
};
