import useFetch from '../../hooks/useFetch';
import { hotelsApi } from '../../api/apiConfig';
import './featured.scss';
import imgHaNoi from '../../img/HaNoi.jpg';
import imgDaNang from '../../img/DaNang.jpg';
import imgHCM from '../../img/HCM.jpg';
import Loading from '../loading/Loading';
const Featured = () => {
  const { data, loading, error } = useFetch(hotelsApi.countByCity);
  const imgs = [imgHaNoi, imgHCM, imgDaNang];

  const listFeatured = data?.map((item, index) => {
    return { ...item, img: imgs[index] };
  });

  return (
    <div className='featured'>
      {loading ? (
        <Loading />
      ) : (
        <>
          {listFeatured.map((item, index) => {
            return (
              <div className='featuredItem' key={index}>
                <img
                  src={item['img']}
                  alt={item['city']}
                  className='featuredImg'
                />
                <div className='featuredTitles'>
                  <h1>{item['city']}</h1>
                  <h2>{item['count']} properties</h2>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
};

export default Featured;
