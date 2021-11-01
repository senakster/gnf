import React from 'react';
import '_libs/_styles/leaflet.scss';
import '_libs/_styles/icons.scss';
import styles from './LeafletCompMiyawaki.module.scss';
import {
  MapContainer, TileLayer, useMap, 
} from 'react-leaflet';
import { mapTilesets } from '_libs/_themes'
import config from '_libs/_config/config.json'
import L, {  LatLngBoundsExpression } from 'leaflet';
import { ActionType, useStateContext } from '_libs/_state';
import Loading from 'components/global/Loading/Loading';
import GeoData from './GeoData/GeoData';
import ModalContent from './GeoData/ModalContent';
import Miyawaki from './Miyawaki/Miyawaki';
import PopContent from './GeoData/PopContent';
// import ModalContent from './Miyawaki/ModalContent';


const LeafletCompMiyawaki: React.FC<any> = ({variant}) => {
  const { dispatch } = useStateContext()
  const {data } = useStateContext().state.state;


  const [state, setState] = React.useState({ 
    tileLayer: false,
    modalContent: false as false | { municipality: string, groups: TGNFG[] }
  })

  function toggleTiles() {
    setState({
      ...state,
      tileLayer: !state.tileLayer
    })
  }

  function setModalContent(data?: {municipality: string, groups: TGNFG[]}) {

    dispatch && dispatch({
      type: ActionType.SET_MODAL,
      payload: <ModalContent {...{...data}}/>
    })
    // setState({
    //   ...state,
    //   modalContent: data || false
    // })
  }

  const c: L.LatLng = new L.LatLng(config.map.centerDefault.lat, config.map.centerDefault.lng);
  return (
    data.grupper.length > 0 && data.updated > 0  ? 
    <div id='LeafletMiyawaki' className={`${styles.LeafletCompMiyawaki} ${variant && styles[variant]}`} data-testid="LeafletCompMiyawaki">
      {/* <div className={styles.videoBackground}>
        <video src={`${process.env.PUBLIC_URL}/video/ocean.mp4`} autoPlay muted loop></video>
      </div> */}
      <MapContainer
        className={styles.mapContainer}
        center={[c.lat, c.lng]}
        zoom={6}
        scrollWheelZoom={true}
        dragging={true}
      >
        {/* <ModalContainer {...{ data: state.modalContent, setModalContent }} /> */}

        {state.tileLayer && <TileLayer
          // {...mapTilesets.dark}
          {...mapTilesets.light}
        />}
        <GeoData 
        attribution="<a href='https://github.com/magnuslarsen/geoJSON-Danish-municipalities'>GeoJson</a>" 
        grupper={data.grupper} 
        setModalContent={setModalContent}
        />
        <Miyawaki {...{}} />
        <MapControls active={state.tileLayer} fn={{ toggleTiles }} />
      </MapContainer> 
    </div> : 
    /** LOADER */ 
    <div className="container">
        <div className="content">
          <Loading />
        </div>
    </div>
  );
}

export default LeafletCompMiyawaki;


const MapControls: React.FC<any> = ({ active, fn }) => {
  const parentMap = useMap()
  const bounds = (config.map.bounds.Denmark as LatLngBoundsExpression)
  const snaptobounds = (config.map.snaptobounds.Denmark as LatLngBoundsExpression)

  const { dispatch } = useStateContext()
  
  function logMessage(title?: string, message?: string) {
    console.log(title, message)
    dispatch && dispatch({
      type: ActionType.NEW_MESSAGE,
      payload: {
        title: title,
        body: message,
      }
    })
  }

  function locationError(e: any) {
    logMessage('Fejl: ', `${e.message} | Error Code: ${e.code}`);
  }
  
  React.useEffect(() => {
    const mapY = document.getElementById('LeafletMiyawaki')
    // window.scrollTo({
    //   top: mapY?.offsetTop || 0,
    //   left: 0,
    //   behavior: 'smooth'
    // });
    defaultZoom();

    function locationFound(e: { latlng: L.LatLng, bounds: L.LatLngBounds }) {
      parentMap.flyTo(e.latlng, 11, {
        animate: true,
        duration: .25
      });
      window.scrollTo({
        top: mapY?.offsetTop || 0,
        left: 0,
        behavior: 'smooth'
      });
    }


    // ATTRIBUTIONS
    parentMap.attributionControl.addAttribution('<a target="_blank" rel="noreferrer" href="//github.com/senakster/gnf">github</a>');
    parentMap.attributionControl.addAttribution('<a href="mailto:senakster@gmail.com">Emil Nakayama</a>');
    parentMap.attributionControl.addAttribution(`v: ${config.app.version}`);

    // GPS EVENTSLISTENERS
    parentMap.addEventListener('locationfound', locationFound)
    parentMap.addEventListener('locationerror', locationError)
    return () => {
      parentMap.removeEventListener('locationfound', locationFound)
      parentMap.removeEventListener('locationerror', locationError)
    };
    // Disable lint - controlling rerenders
    // eslint-disable-next-line react-hooks/exhaustive-deps 
  },[])

  const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
  }

  function defaultZoom() {
    parentMap.flyToBounds(snaptobounds, {duration: .25})
    const mapY = document.getElementById('LeafletMiyawaki')
    window.scrollTo({
      top: mapY?.offsetTop || 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  function whereAmI() {
    parentMap.locate({
      timeout: 2000,
    })
  }
  // parentMap.attributionControl.addAttribution('<a target="_blank" rel="noreferrer" href="//github.com/senakster">Emil Nakayama</>');
  return (
    <>
      <div className={POSITION_CLASSES.topright}>
        <div className="leaflet-control leaflet-bar">
          <span onClick={defaultZoom} className="leaflet-control-zoom-in mapControl" title="Default Zoom" aria-label="Default Zoom"><i className="material-icons">fullscreen</i></span>
          <span onClick={whereAmI} className="leaflet-control-zoom-in mapControl" title="Locate" aria-label="Locate"><i className="material-icons">my_location</i></span>
        </div>
      </div>
      <div className={POSITION_CLASSES.bottomleft}>
        {/* <div className="leaflet-control leaflet-bar">
        <Button onClick={fn.toggleTiles} label={active ? `hide tiles` : `show tiles`}/>
      </div> */}
      </div>


    </>
  )
}
