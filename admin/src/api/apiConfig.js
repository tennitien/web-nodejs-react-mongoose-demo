// "proxy":"http://localhost:5000/api"

export const authApi = {
  adminLogin: '/auth/login/admin',

  newUser: '/auth/register',
};
export const userApi = {
  getUsers: '/users',
  updateById: userId => {
    return `/users/${userId}`;
  },
};
export const transactionApi = {
  getSummary: '/transactions/summary',
};
export const hotelApi = {
  getHotels: '/hotels',
  getById: hotelId => {
    return `/hotels/detail/${hotelId}`;
  },
  updateById: hotelId => {
    return `/hotels/${hotelId}`;
  },
};

export const roomApi = {
  getAlls: '/rooms',
  createRoom: roomId => {
    return `/rooms/${roomId}`;
  },
  getById: roomId => {
    return `/rooms/detail/${roomId}`;
  },
  updateById: roomId => {
    return `/rooms/${roomId}`;
  },
};

export const cloudApi= 'https://api.cloudinary.com/v1_1/dj6nt0z1u/image/upload';
        // `https://api.cloudinary.com/v1_1/${process.env.CLOUDNAME}/image/upload`,
