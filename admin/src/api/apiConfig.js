// "proxy":"http://localhost:5000/api"

export const authApi = {
  postLogin: '/auth/login',
  newUser: '/auth/register',
};
export const userApi = {
  getUsers: '/users',
};
export const transactionApi = {
  getSummary: '/transactions/summary',
};
export const hotelApi = {
  getHotels: '/hotels',
  getById:hotelId=>{
    return `/hotels/detail/${hotelId}`
  },
  updateById:hotelId=>{
    return `/hotels/${hotelId}`
  }
};

export const roomApi = {
  createRoom: hotelId => {
    return `/rooms/${hotelId}`;
  },
};
