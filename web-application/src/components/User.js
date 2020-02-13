import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchUser} from '../actions';

const User = props => {
  // on mount
  useEffect(() => {
    props.dispatch(fetchUser());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return !props.loading ? (
    <div>
      <p>{props.user[0].username}</p>
    </div>
  ) : null;
};

User.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  user: state.user.user,
  loading: state.user.loading,
  error: state.user.error,
});

export default connect(mapStateToProps)(User);
