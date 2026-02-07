import { Helmet } from "react-helmet";
import Banner from "../../components/Banner";
import Cards from "../../components/Cards";
import DiscountProducts from "../../components/DiscountProducts";
import ShopBrand from "../../components/ShopBrand";
import WhyChoose from "../../components/WhyChoose";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Medicine Selling | Home</title>
      </Helmet>
      <Banner />
      <WhyChoose />
      <Cards />
      <DiscountProducts />
      <ShopBrand />
    </div>
  );
};

export default Home;
