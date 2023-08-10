import { Link } from 'react-router-dom';
import { Navbar } from './Navbar';
import { AiOutlineHome, AiOutlinePlusSquare } from 'react-icons/ai';
import { FiSettings } from 'react-icons/fi';

export const LayoutHome = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-row ">
        <div className="flex flex-col mt-10">
          <Link
            to={'/'}
            className="p-5 inline-block hover:bg-primaryTPlay/5 border-l-4 hover:border-primaryTPlay border-transparent transition-all group"
          >
            <AiOutlineHome
              size={30}
              className="group-hover:text-primaryTPlay"
            />
          </Link>
          <Link
            to={'/'}
            className="p-5 inline-block hover:bg-primaryTPlay/5 border-l-4 hover:border-primaryTPlay border-transparent transition-all group"
          >
            <AiOutlinePlusSquare
              size={30}
              className="group-hover:text-primaryTPlay"
            />
          </Link>
          <Link
            to={'/'}
            className="p-5 inline-block hover:bg-primaryTPlay/5 border-l-4 hover:border-primaryTPlay border-transparent transition-all group"
          >
            <FiSettings size={30} className="group-hover:text-primaryTPlay" />
          </Link>
        </div>
        <div className="p-10 w-full">{children}</div>
      </div>
    </div>
  );
};
