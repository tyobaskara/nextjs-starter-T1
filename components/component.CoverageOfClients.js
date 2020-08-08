import compose from 'recompose/compose';
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';
import { withTranslation } from '../i18n';
import { PureComponent } from 'react';

const mapStyles = {
  width: '100%',
  height: '100%',
};

class CoverageOfClients extends PureComponent {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false
  };

  onMarkerClick = (props, marker, name) => {
    this.setState({
      activeMarker: marker,
      selectedPlace: {
        ...props,
        name
      },
      showingInfoWindow: true
    });
  }

  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false
      });
  };

  displayMarkers = () => {
    const { content } = this.props;

    return content.map((store, index) => {
      const { coordinate: { latitude, longitude }, name } = store;

      return (
        <Marker 
          key={index} 
          id={index} 
          position={{
            lat: latitude,
            lng: longitude
          }}
          onClick={(props, marker) => this.onMarkerClick(props, marker, name)}
        />
      )
    })
  }

  displayInfoWindow = () => {
    const { activeMarker, showingInfoWindow, selectedPlace } = this.state;

    return (
      <InfoWindow
        marker={activeMarker}
        onClose={this.onInfoWindowClose}
        visible={showingInfoWindow}>
        <div>
          <p>{selectedPlace.name}</p>
        </div>
      </InfoWindow>
    )
  }

  _renderMaps = () => {
    const { google } = this.props;

    return (
      <div className='CoverageOfClients__maps'>
        <Map
          google={google}
          zoom={5}
          style={mapStyles}
          initialCenter={{ 
            lat: -0.789300, 
            lng: 113.921300 
          }}
          onClick={this.onMapClicked}
        >
          {this.displayMarkers()}
          {this.displayInfoWindow()}
        </Map>
      </div>
    )
  }

  render() {
    return (
      <section className='CoverageOfClients'>
        <div className='container'>
          <h2 className='title'>{this.props.t('coverage-of-clients')}</h2>
  
          {this._renderMaps()}
        </div>
      </section>
    )
  }
}

const CoverageOfClientsHOC = compose(
  GoogleApiWrapper({
    apiKey: 'AIzaSyA1rpG5zsMcmVL-DD0QxWuiFLPPzGQkaWc'
  }),
  withTranslation('common')
);

export default CoverageOfClientsHOC(CoverageOfClients);
