import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
// import axios from "axios";

//! User Files

import Scream from "../components/Scream";

//! Ant Design imports

import { Row, Col } from "antd";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState({ scream: null });
  useEffect(() => {
    // axios
    //   .get("/screams")
    //   .then((res) => {
    //     console.log(res.data);
    //     setState({ scream: res.data });
    //     setLoading(false);
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     console.log(err);
    //   });
    setState({
      scream: [
        {
          screamId: "QoiRmONOEHTCHBKCTCOo",
          likeCount: 1,
          body: "Last scream before deployment by harsh.s.bhatt",
          commentCount: 0,
          createdAt: "2020-08-09T10:15:33.259Z",
          userHandle: "harsh.bhatt",
          isVerified: true,
          userImage:
            "https://firebasestorage.googleapis.com/v0/b/socialapp-bf0a5.appspot.com/o/62458710.jpg?alt=media",
        },
      ],
    });
    setLoading(false);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <Row>
        <Col xs={{ span: 24 }} sm={{ span: 18 }} lg={{ span: 14, offset: 2 }}>
          {state.scream && <Scream scream={state.scream} />}
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 6 }} lg={{ span: 6, offset: 2 }}>
          Profile
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
