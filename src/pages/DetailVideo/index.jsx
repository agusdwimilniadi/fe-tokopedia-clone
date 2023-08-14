/* eslint-disable no-undef */
import { useEffect, useRef, useState } from 'react';
import { CardProduct } from '../../components/atoms/CardProduct';
import { CommentItem } from '../../components/atoms/CommentItem';
import { LayoutHome } from '../../components/molecules/LayoutHome';
import { BiSend } from 'react-icons/bi';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import YouTubeGetID from '../../utils/youtubeId';
import { AiFillPlaySquare } from 'react-icons/ai';
import { useFormik } from 'formik';
import { API_URL } from '../../utils/const';
import { useAuthHeader, useIsAuthenticated } from 'react-auth-kit';

export const DetailVideo = () => {
  const [data, setData] = useState([]);
  const [youtubeId, setYoutubeId] = useState(null);
  const [dataComment, setDataComment] = useState([]);
  const [setter, setSetter] = useState(false);

  const params = useParams();
  const getData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/video/detail/${params.id}`
      );
      const comment = await axios.get(
        `http://localhost:3000/comment/video/${params.id}`
      );
      setDataComment(comment.data.data);
      setData(res.data.data.products);
      setYoutubeId(YouTubeGetID(res.data.data.videoUrl));
    } catch (error) {
      console.log(error);
    }
  };
  const isAuth = useIsAuthenticated();

  useEffect(() => {
    getData();
  }, [setter]);
  const authHeader = useAuthHeader();
  const formik = useFormik({
    initialValues: {
      comment: '',
      videoId: params.id,
    },
    onSubmit: async (values) => {
      try {
        await axios.post(API_URL + 'comment', values, {
          headers: {
            Authorization: `${authHeader()}`,
            'Content-Type': 'application/json',
          },
        });
        setSetter(!setter);
        formik.resetForm();
      } catch (error) {
        console.log(error);
      }
    },
  });
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [dataComment]);
  return (
    <LayoutHome>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
        <div className="md:col-span-8">
          {youtubeId == null ? (
            <div
              role="status"
              className="flex items-center justify-center h-full  bg-secondaryTPlay rounded-lg animate-pulse dark:bg-gray-700"
            >
              <AiFillPlaySquare size={'30%'} />
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <iframe
              width={'100%'}
              height={500}
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen=""
            />
          )}
        </div>
        <div className="md:col-span-4">
          <div className="h-[500px] bg-[#1C1D1F] rounded-lg flex flex-col justify-end">
            <div ref={containerRef} className="flex flex-col overflow-y-scroll">
              {dataComment.length == 0 ? (
                <p className="text-center mb-5 italic text-sm">No Comments</p>
              ) : (
                dataComment.map((item) => {
                  return (
                    <CommentItem
                      key={item._id}
                      comment={item.comment}
                      username={item.username}
                      createdAt={item.createdAt}
                    />
                  );
                })
              )}
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="relative">
                {isAuth() ? null : (
                  <div className="absolute w-full opacity-0 hover:opacity-100 transition-all hover:bg-[#1C1D1F] h-full  z-50 flex items-center justify-center">
                    <Link
                      to={'/login'}
                      className="bg-primaryTPlay hover:scale-105 p-2 text-xs rounded-lg"
                    >
                      Sign to Comment
                    </Link>
                  </div>
                )}
                <input
                  autoComplete="off"
                  type="text"
                  name="comment"
                  className="block w-full p-4  text-sm  border  rounded-lg  bg-[#1C1D1F] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add Comments"
                  onChange={formik.handleChange}
                  required
                  value={formik.values.comment}
                />
                <button
                  type={isAuth() ? 'submit' : 'button'}
                  className="text-white absolute right-2.5 bottom-3.5 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                >
                  <BiSend />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 mt-10 gap-5">
        {data.map((item) => {
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
    </LayoutHome>
  );
};
