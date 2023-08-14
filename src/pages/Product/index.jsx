import { useEffect, useState } from 'react';
import { LayoutHome } from '../../components/molecules/LayoutHome';
import axios from 'axios';
import { API_URL } from '../../utils/const';
import { CardProduct } from '../../components/atoms/CardProduct';
import { SkeletonCard } from '../../components/atoms/SkeletonCard';
import { Link } from 'react-router-dom';

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

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(dataProduct);

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    const filtered = dataProduct.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  return (
    <LayoutHome>
      <h1 className="text-center text-lg font-bold">All Product on T-Play</h1>
      <div className="text-end mt-5">
        <Link
          to={'/add-product'}
          className="inline-block bg-primaryTPlay p-3 rounded "
        >
          Add Product
        </Link>
      </div>
      <form className="mt-5">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search Product..."
            value={searchQuery}
            onChange={handleSearchInputChange}
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-primaryTPlay transition-all hover:bg-primaryTPlay/50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Search
          </button>
        </div>
      </form>

      <div className="">
        {dataProduct.length == 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-4  gap-5">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : filteredProducts.length == 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-5 mt-10 gap-5">
            {dataProduct.map((item) => {
              return (
                <CardProduct
                  key={item._id}
                  imgUrl={item.image}
                  link={item.productUrl}
                  price={item.price}
                  title={item.name}
                />
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-5 mt-10 gap-5">
            {filteredProducts.map((item) => {
              return (
                <CardProduct
                  key={item._id}
                  imgUrl={item.image}
                  link={item.productUrl}
                  price={item.price}
                  title={item.name}
                />
              );
            })}
          </div>
        )}
      </div>
    </LayoutHome>
  );
};
