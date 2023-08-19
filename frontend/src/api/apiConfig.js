// "proxy":"http://localhost:5000/api/"
export const hotelsApi = {
  countByCity: `/hotels/countByCity`,
  countByType: `/hotels/countByType`,
  search: (destination, minPrice, maxPrice) => {
    return `/hotels?city=${destination}&option=cheapestPrice&min=${minPrice}&max=${maxPrice}`;
  },
  getById: hotelId => {
    return `/hotels/detail/${hotelId}`;
  },
  getRooms: hotelid=>{
    return `/hotels/room/${hotelid}`
  }
};
