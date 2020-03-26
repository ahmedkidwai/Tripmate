import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {PropTypes} from 'prop-types';
import {loadUser} from '../../actions/auth';

const PrivateRoute = ({
  component: Component,
  isAuthenticated,
  loading,

  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        !isAuthenticated && !loading ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

// the first prop in propTypes is the way for validate a React Component
PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.object.isRequired,
  isLoading: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  loadUser: PropTypes.func.isRequired,
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {loadUser})(PrivateRoute);
