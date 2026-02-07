import icon1 from "../assets/Why_Choose_Us_icon1.png";
import icon2 from "../assets/Why_Choose_Us_icon2.png";
import icon3 from "../assets/Why_Choose_Us_icon3.png";
import icon5 from "../assets/Why_Choose_Us_icon5.png";
import icon6 from "../assets/Why_Choose_Us_icon6.png";
import WhyChooseUs from "../assets/why-choose-us.png";
const WhyChoose = () => {
  return (
    <div className="bg-[#f1f1f1] relative z-1">
      <div className="lg:py-4">
        <h3 className="pt-5 text-2xl font-semibold text-center"> Why Choose Us</h3>
        <p className="text-center text-gray-500 lg:w-1/2 lg:mx-auto">
          Trusted for quality, affordability, and safety — we deliver genuine products, exceptional service, and secure shopping
          every time.
        </p>
      </div>

      <div className="absolute -translate-x-1/2 -translate-y-1/2 lg:transform lg:mt-14 lg:block -z-10 top-1/2 left-1/2">
        <img className="w-full py-10 sm:mt-30 lg:mt-0" src={WhyChooseUs} />
      </div>

      <div className="items-center justify-between gap-4 pb-2 lg:flex">
        <div className="mx-auto sm:pb-20 lg:w-1/3 lg:pb-0">
          <div className="p-3 text-center transition-all duration-300 rounded-full cursor-pointer hover:bg-white hover:shadow-gray-400 lg:items-center lg:my-16 lg:flex lg:text-left">
            <img className="mx-auto sm:mx-0 md:mx-0 lg:mx-0" src={icon1} alt="" />
            <div className="lg:px-2">
              <h6 className="font-semibold">Lowest Price Guarantee</h6>
              <p className="text-base text-gray-500">Shop confidently with our Lowest Price Guarantee — never overpay again.</p>
            </div>
          </div>
          <div className="p-3 text-center transition-all duration-300 rounded-full cursor-pointer hover:bg-white hover:shadow-gray-400 lg:items-center lg:my-16 lg:flex lg:text-left">
            <img className="mx-auto sm:mx-0 md:mx-0 lg:mx-0" src={icon2} alt="" />
            <div className="xs:text-center xs:pt-2 lg:px-2">
              <h6 className="font-semibold">Exceptional Customer Service</h6>
              <p className="text-base text-gray-500">
                Our support team is here to assist you anytime with fast, friendly, and reliable help
              </p>
            </div>
          </div>
          <div className="p-3 text-center transition-all duration-300 rounded-full cursor-pointer hover:bg-white hover:shadow-gray-400 lg:items-center lg:my-16 lg:flex lg:text-left">
            <img className="mx-auto sm:mx-0 md:mx-0 lg:mx-0" src={icon3} alt="" />
            <div className="px-2">
              <h6 className="font-semibold">Certified International Pharmacies</h6>
              <p className="text-base text-gray-500">
                All medicines are verified and approved through PharmacyChecker for quality, safety.”
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-60 md:mt-0 lg:mt-0 lg:w-1/3">
          <div className="p-3 text-center transition-all duration-300 rounded-full cursor-pointer hover:bg-white hover:shadow-gray-400 lg:items-center lg:my-16 lg:flex lg:text-left">
            <img className="mx-auto sm:mx-0 md:mx-0 lg:mx-0" src={icon6} alt="" />
            <div className="px-2">
              <h6 className="font-semibold">100% Secure Transactions</h6>
              <p className="text-base text-gray-500">
                Get the best deals every time — we guarantee the lowest prices on all products.
              </p>
            </div>
          </div>
          <div className="p-3 text-center transition-all duration-300 rounded-full cursor-pointer hover:bg-white hover:shadow-gray-400 lg:items-center lg:my-16 lg:flex lg:text-left">
            <img className="mx-auto sm:mx-0 md:mx-0 lg:mx-0" src={icon5} alt="" />
            <div className="px-2">
              <h6 className="font-semibold">Certified by PharmacyChecker</h6>
              <p className="text-base text-gray-500">
                Get the best deals every time — we guarantee the lowest prices on all products.
              </p>
            </div>
          </div>
          <div className="p-3 text-center transition-all duration-300 rounded-full cursor-pointer hover:bg-white hover:shadow-gray-400 lg:items-center lg:my-16 lg:flex lg:text-left">
            <img className="mx-auto sm:mx-0 md:mx-0 lg:mx-0" src={icon6} alt="" />
            <div className="px-2">
              <h6 className="font-semibold">Lowest Price Guarantee</h6>
              <p className="text-base text-gray-500">
                Get the best deals every time — we guarantee the lowest prices on all products.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
