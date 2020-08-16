import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { useEffectOnce } from "react-use";

//! User Files

import Scream from "../components/scream/Scream";
import Profile from "../components/profile/Profile";
import { getScreams } from "../store/actions";

//! Ant Design imports

import { Affix } from "antd";

const Home = (props) => {
  useEffectOnce(() => {
    props.getScreams();
  });
  return (
    <div className="home-wrapper">
      <div className="home-left"></div>
      <div className="home-middle">
        <Scream
          screams={props.dataReducer.screams}
          loading={props.dataReducer.isLoading}
        />
      </div>
      <div className="home-right">
        {window.innerWidth > 1000 ? (
          <Affix offsetTop={96}>
            <Profile />
          </Affix>
        ) : (
          <Profile />
        )}
      </div>
    </div>
  );
};

Home.propTypes = {
  getScreams: PropTypes.func.isRequired,
  dataReducer: PropTypes.object.isRequired,
  isProfileLoading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  dataReducer: state.dataReducer,
  isProfileLoading: state.userReducer.isProfileLoading,
});

const mapDispatchToProps = { getScreams };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
