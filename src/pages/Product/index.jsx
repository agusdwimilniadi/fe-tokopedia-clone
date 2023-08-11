import { useEffect, useState } from 'react';
import { LayoutHome } from '../../components/molecules/LayoutHome';
import axios from 'axios';
import { API_URL } from '../../utils/const';
import { CardProduct } from '../../components/atoms/CardProduct';
import { SkeletonCard } from '../../components/atoms/SkeletonCard';

export const Product = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const getData = async () => {
    try {
      const res = await axios.get(API_URL + 'product');
      setDataProduct(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <LayoutHome>
      <h1 className="text-center text-lg font-bold">All Product on T-Play</h1>
      <div className="grid grid-cols-1 md:grid-cols-5 mt-10 gap-5">
        {dataProduct.length == 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4  gap-5">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          dataProduct.map((item) => {
            return (
              <CardProduct
                key={item._id}
                imgUrl={item.image}
                link={item.productUrl}
                price={item.price}
                title={item.name}
              />
            );
          })
        )}
      </div>
    </LayoutHome>
  );
};
