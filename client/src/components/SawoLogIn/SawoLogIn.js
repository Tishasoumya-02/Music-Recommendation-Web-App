import { useState, useEffect } from "react";
import Sawo from "sawo";
import { sawoLogin } from "../../actions/auth";
import { connect } from "react-redux";
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import "./LoginPage.css";

const API_KEY = "2802c132-cc06-425e-808b-71d17f56626b";

const LoginPage = ({ sawoLogin, isAuthenticated }) => {
  const [sawoData, setSawoData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { name, email, password } = sawoData;
  const [isUserLoggedIn, setUserLoggedIn] = useState(false);
  const [payload, setPayload] = useState({});

  // const onChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };
  useEffect(() => {
    var config = {
      containerID: "sawo-container",
      identifierType: "email",
      apiKey: API_KEY,
      onSuccess: (payload) => {
        try {
          sawoLogin('s', payload.identifier, '123456');
        } catch (error) {
          console.log(error);
        }
        
        console.log("Payload : " + JSON.stringify(payload));
        setUserLoggedIn(true);
        console.log(payload);
        setPayload(payload);
      },
    };
    let sawo = new Sawo(config);
    sawo.showForm();
  }, []);

  // const onSubmit = (e) => {
  //   e.preventDefault();
  //   sawoLogin(name, email);
  // };
  

  if (isAuthenticated) {
    return <Redirect to="/music" />;
  }

  

  return (
    <div className="containerStyle">
      <section>
        <h2 className="title">Log In with Sawo</h2>

        {!isUserLoggedIn ? (
          <div className="formContainer" id="sawo-container"></div>
        ) : (
          <div className="loggedin">
            <h2>User Successful Login</h2>
            <div>You are redirecting to music page</div>
            <p>If you are not Redirected, then <Link to = '/music'>Click Here</Link></p>
          </div>
        )}
      </section>
    </div>
  );
};

LoginPage.propTypes = {
  sawoLogin: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { sawoLogin })(LoginPage);
