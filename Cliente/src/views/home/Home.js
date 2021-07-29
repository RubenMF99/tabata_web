import React from "react";
import LayoutApp from "../../components/LayoutApp";
import Head from "./components/Head";
import Info from "./components/Info";

const Home = () => {
  return (
    <LayoutApp>
      <Head />
      <Info />
    </LayoutApp>
  );
};

export default Home;
