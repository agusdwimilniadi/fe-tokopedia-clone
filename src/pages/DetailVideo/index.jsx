/* eslint-disable no-undef */
import { useEffect, useState } from 'react';
import { CardProduct } from '../../components/atoms/CardProduct';
import { CommentItem } from '../../components/atoms/CommentItem';
import { LayoutHome } from '../../components/molecules/LayoutHome';
import { BiSend } from 'react-icons/bi';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import YouTubeGetID from '../../utils/youtubeId';
import { AiFillPlaySquare } from 'react-icons/ai';

export const DetailVideo = () => {
  const [data, setData] = useState([]);
  const [youtubeId, setYoutubeId] = useState(null);
  const [dataComment, setDataComment] = useState([]);

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

  useEffect(() => {
    console.log(youtubeId);
    getData();
  }, []);
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
            <div className="flex flex-col overflow-y-scroll">
              {dataComment.length == 0 ? (
                <p className="text-center mb-5 italic text-sm">No Comments</p>
              ) : (
                dataComment.map((item) => {
                  return (
                    <CommentItem
                      key={item._id}
                      comment={item.comment}
                      username={item.username}
                    />
                  );
                })
              )}
            </div>
            <form>
              <label
                htmlFor="default-search"
                className="mb-2 text-sm font-medium  sr-only text-white"
              >
                Search
              </label>
              <div className="relative">
                <input
                  autoComplete="off"
                  type="search"
                  id="default-search"
                  className="block w-full p-4  text-sm  border  rounded-lg  bg-[#1C1D1F] border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Add Comments"
                  required=""
                />
                <button
                  type="submit"
                  className="text-white absolute right-2.5 bottom-3.5 focus:ring-4 focus:outline-none  font-medium rounded-lg text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
                >
                  <BiSend />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-5 mt-10 gap-5">
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
