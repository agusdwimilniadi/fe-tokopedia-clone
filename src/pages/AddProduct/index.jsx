import { useFormik } from 'formik';
import { LayoutHome } from '../../components/molecules/LayoutHome';
import axios from 'axios';
import { API_URL } from '../../utils/const';
import { useEffect } from 'react';
import { tokenAPI } from '../../utils/getToken';
import { useAuthHeader } from 'react-auth-kit';

export const AddProduct = () => {
  const token = useAuthHeader();

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      image: '',
      productUrl: '',
    },
    onSubmit: async (values) => {
      try {
        await axios.post(API_URL + 'product', values, tokenAPI(token()));
        window.location = '/product';
      } catch (error) {
        console.log(error.message);
      } finally {
        formik.isSubmitting = false;
      }
    },
  });
  const boolean = false;
  useEffect(() => {}, [boolean]);
  return (
    <LayoutHome>
      <h1 className="text-center text-xl font-bold mb-5">Add Product</h1>
      <div>
        <form onSubmit={formik.handleSubmit} className="space-y-4 md:space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-white"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Name Product"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block mb-2 text-sm font-medium text-white"
            >
              Price
            </label>
            <input
              type="number"
              min={0}
              name="price"
              id="price"
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Price Product"
              required
            />
          </div>
          <div>
            <label
              htmlFor="image"
              className="block mb-2 text-sm font-medium text-white"
            >
              Image URL
            </label>
            <input
              type="url"
              name="image"
              id="image"
              placeholder="••••••••"
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="productUrl"
              className="block mb-2 text-sm font-medium text-white"
            >
              Product URL
            </label>
            <input
              type="url"
              name="productUrl"
              id="productUrl"
              placeholder="••••••••"
              onChange={formik.handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-primaryTPlay hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            {formik.isSubmitting ? 'Please wait..' : 'Add Product'}
          </button>
        </form>
      </div>
    </LayoutHome>
  );
};
