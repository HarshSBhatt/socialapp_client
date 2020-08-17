import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

//! User Files

import Scream from "../components/scream/Scream";
import { getUserProfileData } from "../store/actions";
import StaticProfile from "../components/profile/StaticProfile";

//! Ant Design Imports

import { Affix, Empty } from "antd";

const User = (props) => {
  const [state, setState] = useState({ profile: {} });
  const handle = props.match.params.handle;
  const { isLoading, screams } = props.dataReducer;
  useEffect(() => {
    props.getUserProfileData(handle);
    axios
      .get(`/user/${handle}`)
      .then((res) => {
        setState({ profile: res.data.user });
      })
      .catch((err) => console.log(err));
  }, [handle]);

  return (
    <div className="home-wrapper">
      <div className="home-left"></div>
      <div className="home-middle">
        {screams.length === 0 ? (
          <Empty description={`No posts to show from ${handle}`} />
        ) : (
          <Scream screams={screams} loading={isLoading} />
        )}
      </div>
      <div className="home-right">
        <Affix offsetTop={96}>
          <StaticProfile profile={state.profile} />
        </Affix>
      </div>
    </div>
  );
};

User.propTypes = {
  dataReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  dataReducer: state.dataReducer,
});

const mapDispatchToProps = {
  getUserProfileData,
};

export default connect(mapStateToProps, mapDispatchToProps)(User);
