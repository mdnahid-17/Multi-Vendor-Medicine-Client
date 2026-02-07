import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import logo from "../assets/logo.png";
const Footer = () => {
  return (
    <footer className="mt-10 text-gray-200 bg-gray-800">
      <div className="grid max-w-5xl gap-4 px-6 py-12 mx-auto md:grid-cols-4">
        {/* Logo & About */}
        <div>
          <img className="w-[120px] h-[65px] object-cover btn btn-ghost" src={logo} alt="" />
          <p className="text-sm text-gray-400">
            Your trusted online pharmacy. We connect multiple vendors to provide authentic medicines at your doorstep.
          </p>
          <div className="flex mt-4 space-x-3">
            <a href="#" className="hover:text-white">
              <FaFacebookF size={30} />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter size={30} />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram size={30} />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedin size={30} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="mb-3 font-semibold text-white">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/" className="hover:text-white">
                Home
              </a>
            </li>
            <li>
              <a href="/shop" className="hover:text-white">
                Shop
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Vendors
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                About Us
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="mb-3 font-semibold text-white">Support</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="/" className="hover:text-white">
                FAQ
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="/" className="hover:text-white">
                Shipping & Returns
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="mb-3 font-semibold text-white">Newsletter</h3>
          <p className="mb-3 text-sm text-gray-400">Subscribe to receive updates, offers & latest medicines</p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-3 py-2 text-gray-200 placeholder-gray-400 bg-gray-700 rounded-l focus:outline-none"
            />
            <button
              type="submit"
              className="px-2 py-2 font-semibold text-white bg-green-500 rounded-r md:px-4 hover:bg-green-600"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="py-4 text-base text-center text-gray-200 border-t border-gray-700">
        &copy; {new Date().getFullYear()} MediBazaar. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
