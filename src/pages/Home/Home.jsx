import Banner from "./Banner";
import ChefsSpecial from "./ChefsSpecial";
import SpecialOffers from "./SpecialOffers";
import TopFoods from "./TopFoods";

const Home = () => {
  return (
    <div>
      <Banner />
      <TopFoods />
      <SpecialOffers />
      <ChefsSpecial />
      {/* <HotFoods /> */}
    </div>
  );
};

export default Home;
