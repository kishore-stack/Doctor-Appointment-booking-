import React, { useState } from 'react'
import { assets } from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { useContext } from 'react'

const NavBar = () => {
  const navigate = useNavigate()
  const [showMenu, setShowMenu] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const {token, setToken,userData}= useContext(AppContext)
  const logout =()=>{
    setToken(false)
    localStorage.removeItem('token')
  }

  return (
    <div className="flex items-center justify-between py-4 mb-5 border-b border-gray-300 px-4 md:px-10">
      {/* Logo */}
      <img
        onClick={() => navigate('/')}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6 font-medium">
        <NavLink to="/">
          <li className="py-1 hover:text-primary">Home</li>
        </NavLink>
        <NavLink to="/Doctors">
          <li className="py-1 hover:text-primary">Doctors</li>
        </NavLink>
        <NavLink to="/About">
          <li className="py-1 hover:text-primary">About</li>
        </NavLink>
        <NavLink to="/Contact">
          <li className="py-1 hover:text-primary">Contact</li>
        </NavLink>
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Desktop User Menu */}
        {token && userData ? (
          <div className="relative group hidden md:flex items-center gap-2 cursor-pointer">
            <img
              className="w-8 h-8 rounded-full"
              src={userData.image}
              alt="Profile"
            />
            <img className="w-2.5" src={assets.dropdown_icon} alt="Dropdown" />

            {/* Dropdown */}
            <div className="absolute right-0 mt-12 hidden group-hover:flex flex-col bg-white rounded shadow-md p-3 gap-2 min-w-[150px] z-20">
              <p
                onClick={() => navigate('/Profile')}
                className="cursor-pointer hover:text-primary"
              >
                My Profile
              </p>
              <p
                onClick={() => navigate('/MyAppointment')}
                className="cursor-pointer hover:text-primary"
              >
                My Appointment
              </p>
              <p
                onClick={logout}
                className="cursor-pointer hover:text-primary"
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate('/Login')}
            className="hidden md:block bg-primary text-white py-2 px-4 rounded"
          >
            Create Account
          </button>
        )}

        {/* Mobile Profile Icon */}
        {token && (
          <div className="relative md:hidden">
            <img
              onClick={() => setShowProfileMenu((prev) => !prev)}
              className="w-8 h-8 rounded-full cursor-pointer"
              src={assets.profile_pic}
              alt="Profile"
            />
            {showProfileMenu && (
              <div className="absolute right-0 mt-10 bg-white rounded shadow-md flex flex-col p-3 min-w-[150px] z-20">
                <p
                  onClick={() => {
                    navigate('/Profile')
                    setShowProfileMenu(false)
                    setShowMenu(false)
                  }}
                  className="cursor-pointer hover:text-primary"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate('/MyAppointment')
                    setShowProfileMenu(false)
                    setShowMenu(false)
                  }}
                  className="cursor-pointer hover:text-primary"
                >
                  My Appointment
                </p>
                <p
                  onClick={() => {
                    setToken(false)
                    setShowProfileMenu(false)
                    setShowMenu(false)
                  }}
                  className="cursor-pointer hover:text-primary"
                >
                  Logout
                </p>
              </div>
            )}
          </div>
        )}

        {/* Mobile Menu Button */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="Menu"
        />
      </div>

      {/* Mobile Menu Overlay */}
      {showMenu && (
        <div className="fixed inset-0 z-30 bg-black bg-opacity-30">
          <div className="fixed right-0 top-0 w-3/4 max-w-xs h-full bg-white shadow-lg flex flex-col">
            {/* Mobile Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <img className="w-36" src={assets.logo} alt="Logo" />
              <img
                className="w-6 h-6 cursor-pointer"
                onClick={() => setShowMenu(false)}
                src={assets.cross_icon}
                alt="Close"
              />
            </div>

            {/* Mobile Menu Links */}
            <ul className="flex flex-col items-start gap-4 mt-5 px-4 text-lg font-medium">
              <NavLink onClick={() => setShowMenu(false)} to="/">
                Home
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/Doctors">
                Doctors
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/About">
                About
              </NavLink>
              <NavLink onClick={() => setShowMenu(false)} to="/Contact">
                Contact
              </NavLink>

              {!token && (
                <button
                  onClick={() => {
                    navigate('/Login')
                    setShowMenu(false)
                  }}
                  className="bg-primary text-white py-2 px-4 rounded mt-4"
                >
                  Create Account
                </button>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default NavBar
