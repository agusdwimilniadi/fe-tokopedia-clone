import { useEffect, useState } from 'react';
import axios from 'axios';
import { CardVideo } from '../../components/atoms/CardVIdeo';
import { SkeletonCard } from '../../components/atoms/SkeletonCard';
import { LayoutHome } from '../../components/molecules/LayoutHome';
import { API_URL } from '../../utils/const';
export const Home = () => {
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      const res = await axios.get(API_URL + 'video');
      setData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <LayoutHome>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center ">
        <div>
          <h1 className="text-7xl leading-tight font-bold">
            LOOK, PREVIEW, CHECKOUT AND BUY
          </h1>
          <p>
            &quot;Unwind with the Finest in E-Commerce: Where Playful Previews
            Bring Relaxation to Shopping! &quot;
          </p>
        </div>
        <div>
          <iframe
            width={'100%'}
            height={315}
            src="https://www.youtube-nocookie.com/embed/lnTWVAyMHg0?si=LS_MlLz675a5fEa-&controls=0"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen=""
          />
        </div>
      </div>
      <div className="mt-10">
        <h1 className="text-lg font-semibold">Live of The Day</h1>
        <div className="">
          {data.length == 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-4  gap-5">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
              {data.toReversed().map((item) => (
                <CardVideo item={item} key={item._id} />
              ))}
            </div>
          )}
        </div>
      </div>
    </LayoutHome>
  );
};
