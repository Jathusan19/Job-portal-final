import { Menu, Transition } from "@headlessui/react";
import React, {Fragment, useEffect, useState} from "react";
import { AiOutlineClose, AiOutlineLogout } from "react-icons/ai";
import { BiChevronDown } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { HiMenuAlt3 } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Logout } from "../redux/userSlice";
import CustomButton from "./CustomButton";
import {apiRequest} from "../utils/index.js";

function MenuList({ user, onClick }) {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(Logout());
    window.location.replace("/");
  };

  return (
    <div>
      <Menu as='div' className='inline-block text-left'>
        <div className='flex'>
          <Menu.Button className='inline-flex gap-2 w-full rounded-md bg-white md:px-4 py-2 text-sm font-medium text-slate-700 hover:bg-opacity-20 '>
            <div className='leading[80px] flex flex-col items-start'>
              <p className='text-sm font-semibold '>
                {user?.firstName ?? user?.name}
              </p>
              <span className='text-sm text-blue-600 '>
                {user?.jobTitle ?? user?.email}
              </span>
            </div>

            {user?.profileUrl ? (
              <img
                src={user?.profileUrl}
                alt='user profile'
                className='w-10 h-10 rounded-full object-cover '
              />
            ) : (
              <div className='w-10 h-10 rounded-full bg-indigo-600 text-white text-lg flex items-center justify-center'>
                {user?.firstName?.slice(0, 1) || user?.name?.slice(0, 1)}
              </div>
            )}
            <BiChevronDown
              className='h-8 w-8 text-slate-600'
              aria-hidden='true'
            />
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute z-50 right-2 mt-2 w-56 origin-top-right divide-y dividfe-gray-100 rounded-md bg-white shadow-lg focus:outline-none '>
            <div className='p-1 '>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`${
                      user?.accountType ? "user-profile" : "company-profile"
                    }`}
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md p-2 text-sm`}
                    onClick={onClick}
                  >
                    <CgProfile
                      className={`${
                        active ? "text-white" : "text-gray-600"
                      } mr-2 h-5 w-5  `}
                      aria-hidden='true'
                    />
                    {user?.accountType ? "User Profile" : "Company Profile"}
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => handleLogout()}
                    className={`${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                  >
                    <AiOutlineLogout
                      className={`${
                        active ? "text-white" : "text-gray-600"
                      } mr-2 h-5 w-5  `}
                      aria-hidden='true'
                    />
                    Log Out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [isOpenNote, setIsOpenNote] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [notification, setNotification] = useState(["Application status changed Successfully"]);




  const toggleDropdown = () => {
    setIsOpenNote(!isOpenNote);
  };

  const handleCloseNavbar = () => {
    setIsOpen((prev) => !prev);
  };

  const notifyDetails = async () => {

    try {
      const res = await apiRequest({
        url: "/notify",
        method: "GET",
      });

      console.log(res)
      // setNotification(res.notification)

    } catch (error) {
      console.log(error);
    }
  };

  console.log(notification)

  useEffect(() => {
    notifyDetails()
  }, []);

  console.log(user)

  return (
    <>
      <div className='relative bg-[#f7fdfd] z-50'>
        <nav className='container mx-auto flex items-center justify-between p-5'>
          <div>
            <Link to='/' className='text-blue-600 font-bold text-xl'>
              University of Ruhuna <span className='text-[#1677cccb]'>JobPortal</span>
            </Link>
          </div>

          <ul className='hidden lg:flex gap-10 text-base'>
            {user?.firstName && user?.accountType !== "lecturer" && <li>
              <Link to='/'>Find Job</Link>
            </li>}
            {user?.firstName && user?.accountType !== "lecturer" && <li>
              <Link to={'/saved-jobs/'+user?._id}>Saved Jobs</Link>
            </li>}
            <li>
              {!user?.name && user?.accountType !== "lecturer" && <Link to='/companies'>Companies</Link>}
            </li>
            <li>
              {user?.accountType !== "lecturer" && <Link
                  to={
                    user?.accountType === "seeker"
                        ? "/applications"
                        : "/upload-job"
                  }
              >
                {user?.accountType === "seeker" ? "Applications" : "Upload Job"}
              </Link>}
            </li>
            {user?.accountType !== "seeker" && <li>
              <Link
                  to={"/applications"}
              >
                Applications
              </Link>
            </li>}
            <li>
              <Link to='/about-us'>About</Link>
            </li>
          </ul>

          <div className="relative">
            <button
                onClick={toggleDropdown}
                className="focus:outline-none focus:ring"
            >
              <svg
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0a3 3 0 11-6 0h6z"
                ></path>
              </svg>
            </button>

            {isOpenNote && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                  <div className="py-1">
                    {notification?.map((item)=>(<div
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {item}
                    </div>))}

                  </div>
                </div>
            )}
          </div>

          <div className='hidden lg:block'>
            {!user?.token ? (
                <a href='/user-auth'>
                  <CustomButton
                      title='Sign In'
                      containerStyles='text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600'
                  />
                </a>
            ) : (
                <div>
                  <MenuList user={user}/>
                </div>
            )}
          </div>

          <button
              className='block lg:hidden text-slate-900'
              onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? <AiOutlineClose size={26}/> : <HiMenuAlt3 size={26}/>}
          </button>
        </nav>

        {/* MOBILE MENU */}
        <div
            className={`${
                isOpen ? "absolute flex bg-[#f7fdfd] " : "hidden"
            } container mx-auto lg:hidden flex-col pl-8 gap-3 py-5`}
        >
          <Link to='/' onClick={handleCloseNavbar}>
            Find Job
          </Link>
          <Link to='/companies' onClick={handleCloseNavbar}>
            Companies
          </Link>
          <Link
              onClick={handleCloseNavbar}
              to={
                user?.accountType === "seeker" ? "applly-gistory" : "upload-job"
              }
          >
            {user?.accountType === "seeker" ? "Applications" : "Upload Job"}
          </Link>
          <Link to='/about-us' onClick={handleCloseNavbar}>
            About
          </Link>

          <div className='w-full py-10'>
            {!user?.token ? (
                <a href='/user-auth'>
                  <CustomButton
                      title='Sign In'
                      containerStyles={`text-blue-600 py-1.5 px-5 focus:outline-none hover:bg-blue-700 hover:text-white rounded-full text-base border border-blue-600`}
                  />
                </a>
            ) : (
                <div>
                  <MenuList user={user} onClick={handleCloseNavbar}/>
                </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
