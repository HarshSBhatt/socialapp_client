import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";

//! User Files

import Scream from "../components/Scream";

//! Ant Design imports

import { Row, Col } from "antd";

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
      .catch((err) => console.log(err));
  }, []);

  const recentScreams =
    state.scream &&
    state.scream.map((scream) => (
      <Scream key={scream.screamId} scream={scream} />
    ));

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Row>
        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 14, offset: 2 }}>
          {recentScreams}
        </Col>
        <Col xs={{ span: 24, offset: 1 }} lg={{ span: 6, offset: 2 }}>
          Profile
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
