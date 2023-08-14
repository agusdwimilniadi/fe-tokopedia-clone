import { LayoutHome } from '../../components/molecules/LayoutHome';
import Select from 'react-select';
import { useFormik } from 'formik';
import axios from 'axios';
import { API_URL } from '../../utils/const';
import { tokenAPI } from '../../utils/getToken';
import { useAuthHeader } from 'react-auth-kit';
import { useEffect, useState } from 'react';

export const VideoPage = () => {
  const [dataProduct, setDataProduct] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const token = useAuthHeader();
  const formik = useFormik({
    initialValues: {
      title: '',
      videoUrl: '',
      productIds: [],
    },
    onSubmit: async (values) => {
      try {
        await axios.post(API_URL + 'video', values, tokenAPI(token()));
        setIsSuccess(true);
        setTimeout(() => {
          window.location.href = '/';
        }, 1500);
      } catch (error) {
        console.log(error.message);
        setIsSuccess(false);
      } finally {
        formik.resetForm();
        formik.isSubmitting(false);
      }
    },
  });
  useEffect(() => {
    const getDataProduct = async () => {
      try {
        setIsSuccess(false);
        const res = await axios.get(API_URL + 'product');
        const options = res.data.data.map((product) => ({
          value: product._id,
          label: product.name,
        }));
        setDataProduct(options);
      } catch (error) {
        console.log(error.message);
      }
    };
    getDataProduct();
  }, []);
  return (
    <LayoutHome>
      <h1 className="text-lg text-center font-bold">Add Video</h1>
      {isSuccess ? (
        <div className="text-center mt-5 bg-green-500 py-1 rounded-lg">
          Success add Product, please wait...{' '}
          <div role="status" className="inline-block ms-2">
            <svg
              aria-hidden="true"
              className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : null}

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col gap-5 mt-10"
      >
        <div>
          <label
            htmlFor="title"
            className="block mb-2 text-sm font-medium text-white"
          >
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            onChange={formik.handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Input your video Title"
            required
          />
        </div>
        <div>
          <label
            htmlFor="videoUrl"
            className="block mb-2 text-sm font-medium text-white"
          >
            Video URL
          </label>
          <input
            type="url"
            name="videoUrl"
            id="videoUrl"
            onChange={formik.handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="https://www.youtube.com/watch?v=xxxxxxxx"
            required
          />
        </div>
        <div>
          <label
            htmlFor="productList"
            className="block mb-2 text-sm font-medium text-white"
          >
            Product
          </label>
          <Select
            id="productList"
            onChange={(selectedOptions) => {
              const selectedValues = selectedOptions.map(
                (option) => option.value
              );
              formik.setFieldValue('productIds', selectedValues);
            }}
            closeMenuOnSelect={false}
            isMulti
            required
            options={dataProduct}
            styles={{
              option: (baseStyles, state) => ({
                ...baseStyles,
                color: state.isFocused ? 'white' : 'black',
                backgroundColor: state.isFocused ? '#E373FF' : 'white',
              }),
            }}
          />
        </div>
        <button type="submit" className="mt-10 bg-primaryTPlay py-2 rounded">
          {formik.isSubmitting ? 'Please wait....' : 'Add Video'}
        </button>
      </form>
    </LayoutHome>
  );
};
