import Loading from 'components/global/Loading/Loading';
import L from 'leaflet';
import React from 'react';
import { MapContainer } from 'react-leaflet';
import { ActionType, useStateContext } from '_libs/_state';
import '_libs/_styles/leaflet.scss'
// import "_libs/_styles/leaflet1.7.1.css";
import styles from './LeafletBase.module.scss';
import config from '_libs/_config'
import GeoData from './GeoData/GeoData';
import Miyawaki from './Miyawaki/Miyawaki';
import ModalContent from './GeoData/ModalContent';
import MapControls from './MapControls/MapControls'

type Props = {
  variant: string
}
const LeafletBase: React.FC<Props> = ({variant}) => {
  const { dispatch } = useStateContext()
  const { data } = useStateContext().state.state;
  const c: L.LatLng = new L.LatLng(config.map.centerDefault.lat, config.map.centerDefault.lng);
  function setModalContent(data?: { municipality: string, groups: TGNFG[] }) {

    dispatch && dispatch({
      type: ActionType.SET_MODAL,
      payload: <ModalContent {...{ ...data }} />
    })
    // setState({
    //   ...state,
    //   modalContent: data || false
    // })
  }

  return (
    data.grupper.length > 0 && data.updated > 0 ?
    <div id="LeafletBase" className={`${styles.LeafletBase} ${variant ? styles[variant] : ''}`} data-testid="LeafletBase">
        <MapContainer
          className={styles.mapContainer}
          center={[c.lat, c.lng]}
          zoom={6}
          scrollWheelZoom={true}
          dragging={true}
        >
          <GeoData
            attribution="<a href='https://github.com/magnuslarsen/geoJSON-Danish-municipalities'>GeoJson</a>"
            grupper={data.grupper}
            setModalContent={setModalContent}
          />
          {/* <Miyawaki {...{}} /> */}
          <MapControls />
        </MapContainer>
    </div> 
   : <Loading />
);
}

export default LeafletBase;
