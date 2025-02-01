import Features from "./features";
import Footer from "./footer";
import Hero from "./hero";
import NavBar from "./navBar";


const LandingPage = () => {

    
  return (
    <div className="Main-Frame">
      <NavBar/>
      <Hero/>
      <Features/>
      <Footer />
    </div>
  );
};

export default LandingPage;
