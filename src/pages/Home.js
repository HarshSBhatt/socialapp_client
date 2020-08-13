import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

//! User Files

import Scream from "../components/Scream";
import Profile from "../components/profile/Profile";

//! Ant Design imports

import { Affix } from "antd";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({ scream: null });
  useEffect(() => {
    axios
      .get("/screams")
      .then((res) => {
        console.log(res.data);
        setState({ scream: res.data });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="home-wrapper">
      <div className="home-left"></div>
      <div className="home-middle">
        {state.scream && <Scream scream={state.scream} />}
      </div>
      <div className="home-right">
        {window.innerWidth > 1000 && (
          <Affix offsetTop={96}>
            <Profile />
          </Affix>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
