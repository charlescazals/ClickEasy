import http from "../http-common";

const getAll = () => {
  return http.get("/helpers");
};

const get = id => {
  return http.get(`/helpers/${id}`);
};

const create = data => {
  return http.post("/helpers", data);
};

const update = (id, data) => {
  return http.put(`/helpers/${id}`, data);
};

const remove = id => {
  return http.delete(`/helpers/${id}`);
};

const removeAll = () => {
  return http.delete(`/helpers`);
};

const findByName = name => {
  return http.get(`/helpers?name=${name}`);
};

const findById = id => {
  return http.get(`/helpers/${id}`);
};




/*const matchHelpers = data => { //adds problem to dbase
  return http.post("/problems", data)
};*/

const getCalendar = data => {
  return http.post("/calendar", data)
}

const updateMeetingTable = data =>{
  return http.post("/meeting-table", data)
}
const getMeetingHelper = code => {
  return http.get(`/meeting-table?meetingcode=${code}`)
}

const createRoom = meeting_code => {
  return http.post('/create-room', meeting_code)
}

const saveStripeInfo = data => {
  return http.post(`/save-stripe-info/`, data)
}



export default {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByName,
  findById,
  //matchHelpers,
  getCalendar,
  updateMeetingTable,
  getMeetingHelper,
  createRoom,
  saveStripeInfo
};