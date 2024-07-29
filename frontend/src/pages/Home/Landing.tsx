import React from "react";
import Nav from "../../components/Landing/Nav";
import Section1 from "../../components/Landing/Section1";
import Section2 from "../../components/Landing/Section2";
import Section3 from "../../components/Landing/Section3";
import Section4 from "../../components/Landing/Section4";
import Footer from "../../components/Landing/Footer";

export default function Landing() {
  return (
    <div>
      <div>
        <Nav />
      </div>
      <div className="w-3/4 mx-auto my-8">
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
      </div>
      <div className="w-3/4 mx-auto mb-4">
        <Footer />
      </div>
    </div>
  );
}
