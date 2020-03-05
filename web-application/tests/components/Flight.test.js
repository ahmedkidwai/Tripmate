import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import expect from 'expect';
import {Flight} from '../../src/components/Flight';

Enzyme.configure({adapter: new Adapter()});

describe('Flight Component', () => {
  it('is not loading and should render self and sub elements', () => {
    const wrapper = shallow(
      <Flight flight={[{departure: {
                          airport: {
                            iata: "Test Departure IATA",
                            name: "Test Departure Airport Name",
                            shortName: "Test Departure Airport Short Name",
                            municipalityName: "Test Departure City Name",
                            countryCode: "Test Departure Country Code"
                          },
                          scheduledTimeLocal: "Test Departure Scheduled Time",
                          actualTimeLocal: "Test Departure Actual Time",
                          gate: "Test Departure Gate"
                        },
                        arrival: {
                          airport: {
                            iata: "Test Arrival IATA",
                            name: "Test Arrival Airport Name",
                            shortName: "Test Arrival Airport Short Name",
                            municipalityName: "Test Arrival City Name",
                            countryCode: "Test Arrival Country Code"
                          },
                          scheduledTimeLocal: "Test Arrival Scheduled Time",
                          actualTimeLocal: "Test Arrival Actual Time",
                          gate: "Test Arrival Gate"
                        },
                        lastUpdatedUtc: "Test Last Updated Time",
                        number: "Test Flight Number",
                        status: "Test Status",
                        aircraftModel: "Test Aircraft Model",
                        airline: "Test Airline"
                      }
                    ]} loading={false} />,
    );
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(true);
    expect(wrapper.findWhere(number => number.type() === 'p' && number === 'Test Number'));
  });
  it('is loading and should render nothing', () => {
    const wrapper = shallow(<Flight loading={true} />);
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find('div').exists()).toBe(false);
    expect(wrapper.find('p').exists()).toBe(false);
  });
});
