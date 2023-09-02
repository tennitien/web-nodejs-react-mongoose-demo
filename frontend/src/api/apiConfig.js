// "proxy":"http://localhost:5000/api/"
export const hotelsApi = {
  countByCity: `/hotels/countByCity`,
  countByType: `/hotels/countByType`,
  sortBy: (sort, limit, value) => {
    return `/hotels/sortBy?sort=${sort}&limit=${limit}&value=${value}`;
  },
  search: (destination, minPrice, maxPrice) => {
    return `/hotels/search?city=${destination}&option=cheapestPrice&min=${minPrice}&max=${maxPrice}`;
  },
  getById: hotelId => {
    return `/hotels/detail/${hotelId}`;
  },
  getRooms: hotelid => {
    return `/hotels/room/${hotelid}`;
  },
};

export const authApi = {
  register: '/auth/register',
  postLogin: '/auth/login',
};

export const transactionApi = {
  getById: userId => {
    return `/transactions/user/${userId}`;
  },
};
