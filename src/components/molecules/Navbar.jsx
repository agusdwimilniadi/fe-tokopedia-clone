import { useState } from 'react';
import { useAuthUser, useIsAuthenticated, useSignOut } from 'react-auth-kit';
import { SiBbciplayer } from 'react-icons/si';
import { Link, NavLink } from 'react-router-dom';

export const Navbar = () => {
  const isAuthenticated = useIsAuthenticated();
  const signOut = useSignOut();
  const auth = useAuthUser();
  const [setsetShow, setSetsetShow] = useState(false);

  return (
    <nav className=" border-gray-200 bg-dark relative">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to={'/'} className="flex items-center">
          <SiBbciplayer size={30} />
          <span className="self-center text-2xl ms-5 font-semibold whitespace-nowrap text-white">
            T-Play
          </span>
        </Link>
        {isAuthenticated() ? (
          <div
            className={`z-50 absolute right-10 top-16 ${
              setsetShow ? 'block' : 'hidden'
            }  my-4 text-base list-none  divide-y  rounded-lg shadow bg-gray-700 divide-gray-600`}
            id="user-dropdown"
          >
            <div className="px-4 py-3">
              <span className="block text-sm  text-white">
                {auth().username}
              </span>
              <span className="block text-sm   truncate text-gray-400">
                {auth().email}
              </span>
            </div>
            <ul className="py-2" aria-labelledby="user-menu-button">
              <li>
                <button
                  onClick={() => {
                    signOut();
                  }}
                  className="block px-4 py-2 text-sm w-full text-start  hover:bg-gray-600 text-gray-200 hover:text-white"
                >
                  Sign out
                </button>
              </li>
            </ul>
          </div>
        ) : null}
        {isAuthenticated() ? (
          <div className="flex items-center md:order-2 ">
            <button
              type="button"
              className="flex mr-3 text-sm bg-black rounded-full md:mr-0 focus:ring-4  focus:ring-gray-600"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="user-dropdown"
              data-dropdown-placement="bottom"
              onClick={() => {
                setSetsetShow(!setsetShow);
              }}
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full border"
                src="https://i.pinimg.com/originals/7d/34/d9/7d34d9d53640af5cfd2614c57dfa7f13.png"
                alt="user photo"
              />
            </button>
            {/* Dropdown menu */}

            <button
              data-collapse-toggle="navbar-user"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden focus:outline-none focus:ring-2  text-gray-400 hover:bg-gray-700 focus:ring-gray-600"
              aria-controls="navbar-user"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center md:order-2 gap-2">
            <Link
              to={'/login'}
              className="inline-block bg-primaryTPlay py-2 px-5 rounded-lg  transition-all hover:scale-105"
            >
              Login
            </Link>
            <Link
              to={'/register'}
              className="inline-block bg-primaryTPlay py-2 px-5 rounded-lg bg-transparent text-primaryTPlay border-primaryTPlay border border-transparent transition-all hover:scale-105 font-bold"
            >
              Register
            </Link>
          </div>
        )}

        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border  rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  bg-black md:bg-dark border-gray-700">
            <li>
              <NavLink
                to={'/'}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 pl-3 pr-4 rounded md:p-0 text-primaryTPlay'
                    : 'block py-2 pl-3 pr-4 rounded md:p-0 text-white hover:text-primaryTPlay'
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/product'}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 pl-3 pr-4 rounded md:p-0 text-primaryTPlay'
                    : 'block py-2 pl-3 pr-4 rounded md:p-0 text-white hover:text-primaryTPlay'
                }
              >
                Product
              </NavLink>
            </li>
            <li>
              <NavLink
                to={'/video'}
                className={({ isActive }) =>
                  isActive
                    ? 'block py-2 pl-3 pr-4 rounded md:p-0 text-primaryTPlay'
                    : 'block py-2 pl-3 pr-4 rounded md:p-0 text-white hover:text-primaryTPlay'
                }
              >
                Video
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
