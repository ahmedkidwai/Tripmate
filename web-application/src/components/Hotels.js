import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {fetchHotel} from '../actions/hotel/hotelActions';

export const Hotels = props => {
  useEffect(() => {
    props.dispatch(fetchHotel());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!props.loading) {
    return (
      <div>
        <h2>List of Hotels</h2>
        {props.hotel.map(hotel => (
          <p key={hotel._id}>{hotel.hotelname}</p>
        ))}
      </div>
    );
  }
  return (
    <div>
      <p>Hotels are under construction :p</p>
    </div>
  );
};

Hotels.propTypes = {
  dispatch: PropTypes.func,
  hotel: PropTypes.array,
  loading: PropTypes.bool,
};

const mapStateToProps = state => ({
  hotel: state.hotel.hotel,
  loading: state.hotel.loading,
  error: state.hotel.error,
});

export default connect(mapStateToProps)(Hotels);
