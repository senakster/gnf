import React from 'react';
import ReactDOMServer from "react-dom/server";
import '_styles/leaflet.scss';
import '_styles/icons.scss';
import styles from './LeafletComp.module.scss';
import { FeatureCollection } from 'geojson';
import {
  MapContainer, TileLayer, useMap, GeoJSON,
  // Marker, Popup, Polyline, Polygon, useMapEvents 
} from 'react-leaflet';
import { mapTilesets } from '_themes'
import municipalitiesGeoJSON from '_data/denmark-municipalities.json'
import GNFGrupper from '_data'
import config from '_config/config.json'
import L, { LatLngBoundsExpression } from 'leaflet';
import Button from '../Button/Button';
import { logo } from '_media/img/images.json'
import { DefaultTheme, useTheme } from 'styled-components';
import { ActionType, useStateContext } from '_state';
import Loading from 'components/global/Loading/Loading';
import SvgIcon from '../SvgIcon/SvgIcon';

const LeafletComp: React.FC = () => {
  const { data } = useStateContext().state.state;
  const [state, setState] = React.useState({ tileLayer: false})

  function toggleTiles() {
    setState({
      ...state,
      tileLayer: !state.tileLayer
    })
  }


  // console.log(state.grupper)
  const c: L.LatLng = new L.LatLng(config.map.centerDefault.lat, config.map.centerDefault.lng);
  return (
    data.grupper.length > 0 && data.updated > 0  ? 
    <div id='LeafletMap' className={styles.LeafletComp} data-testid="LeafletComp">
      <MapContainer
        className={styles.mapContainer}
        center={[c.lat, c.lng]}
        zoom={6}
        scrollWheelZoom={true}
      >
        {state.tileLayer && <TileLayer
          // {...mapTilesets.dark}
          {...mapTilesets.light}
        />}
        <GeoData attribution="<a href='https://github.com/magnuslarsen/geoJSON-Danish-municipalities'>GeoJson</a>" grupper={data.grupper} />
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

export default LeafletComp;


const MapControls: React.FC<any> = ({ active, fn }) => {
  const parentMap = useMap()
  const bounds = (config.map.bounds.Denmark as LatLngBoundsExpression)
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
    const mapY = document.getElementById('LeafletMap')
    window.scrollTo({
      top: mapY?.offsetTop || 0,
      left: 0,
      behavior: 'smooth'
    });

    function locationFound(e: { latlng: L.LatLng, bounds: L.LatLngBounds }) {
      // logMessage('Info: ', 'Lokation Fundet');
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


  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function defaultZoom() {
    parentMap.flyToBounds(bounds, {duration: .25})
    const mapY = document.getElementById('LeafletMap')
    window.scrollTo({
      top: mapY?.offsetTop || 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  function whereAmI() {
    parentMap.locate({
      // setView: true,
      // watch: true,
      // maxZoom: 11,
      timeout: 2000,
    })
  }

  return (
    <>
      <div className={POSITION_CLASSES.topright}>
        <div className="leaflet-control leaflet-bar">
          <span onClick={scrollToTop} className="leaflet-control-zoom-in mapControl circleIcon" title="Scroll to Top" aria-label="Scroll to Top">&#x21EB;</span>
          <span onClick={defaultZoom} className="leaflet-control-zoom-in mapControl" title="Default Zoom" aria-label="Default Zoom">&#x26F6;</span>
          <span onClick={whereAmI} className="leaflet-control-zoom-in mapControl" title="Locate" aria-label="Locate">&#x2316;</span>
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
const GeoData: React.FC<{ grupper: TGNFG[], attribution: string }> = ({ grupper, attribution }) => {
  const theme = useTheme() as DefaultTheme & {
    body: string,
    text: string,
    primaryColor: string,
    secondaryColor: string,
    primaryDarkColor: string,
    secondaryDarkColor: string,
  }
  const gnfgreen: string = "#1db954"
  // const defaultFill = '#a1d100';
  const defaultFill = theme.primaryColor || gnfgreen
  const highlightFill = theme.secondaryDarkColor || `dodgerblue` || theme.secondaryColor
  const mapStroke = theme.text || defaultFill
  // const map = useMapEvents({
  //   click: (e) => {
  //     console.log(e)
  //   }
  // });
  const map = useMap()

  React.useEffect(() => {
    const bounds = (config.map.bounds.Denmark as LatLngBoundsExpression)
    map.setMaxBounds(bounds)
    map.fitBounds(bounds)
    map.setMinZoom(map.getZoom() - .5)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function getBboxFromCoords(event: L.LeafletMouseEvent) {
    const coords = event.target.feature.geometry.coordinates.flat().flat()
    var lats = []; var lngs = [];
    for (var i = 0; i < coords.length; i++) {
      lats.push(coords[i][1]);
      lngs.push(coords[i][0]);
    }
    // calc the min and max lng and lat
    var minlat = Math.min.apply(null, lats),
      maxlat = Math.max.apply(null, lats);
    var minlng = Math.min.apply(null, lngs),
      maxlng = Math.max.apply(null, lngs);

    // create a bounding rectangle that can be used in leaflet
    const bbox = [[minlat, minlng], [maxlat, maxlng]] as [[lat: number, lng: number], [lat: number, lng: number]];
    return bbox;
  }

  function fitBounds(bbox: [[lat: number, lng: number], [lat: number, lng: number]]) {
    map.fitBounds(bbox)
  }

  function kommuneClick(event: L.LeafletMouseEvent) {
    fitBounds(getBboxFromCoords(event))
  }
  function mouseoverColor(event: L.LeafletMouseEvent) {
    event.target.setStyle({
      fillColor: highlightFill,
      fillOpacity: 1,
    })
  }
  function mouseleaveColor(event: L.LeafletMouseEvent) {
    const groups = grupper?.filter((gg) =>
      gg.kommune.toUpperCase() === event.target.feature.properties.name.toUpperCase()
      // compare(gg.kommune, event.target.feature.properties.name)
    );
    event.target.setStyle({
      fillColor: groups.length > 0 ? defaultFill : defaultFill,
      fillOpacity: groups.length > 0 ? .5 + .1 * groups.length : .1,
    })
  }

  function onEachMunicipality(data: any, layer: L.Layer | any) {
    const groups = grupper?.filter((gg) =>
      gg.kommune.toUpperCase() === data.properties.name.toUpperCase()
    );
    // console.log(GNFGrupper.grupper)
    groups.length > 0 && layer.bindPopup(ReactDOMServer.renderToString(<PopContent props={{ ...data.properties, groups: groups }} />))
    // GNFGrupper.grupper.forEach((g) => console.log(g.kommune))
    // console.log(data.properties.name)
    layer.bindTooltip(`${data.properties.name}: ${groups.length} ${groups.length === 1 ? 'gruppe' : 'grupper'}`)

    layer.options = {
      ...layer.options,
      color: mapStroke,
      fillColor: groups.length > 0 ? defaultFill : defaultFill,
    }

    layer.options = groups.length > 0 ? {
      ...layer.options,
      fillOpacity: .5 + .1 * groups.length
    } :
      {
        ...layer.options,
        fillOpacity: .1,
      }

    layer.on(
      {
        click: kommuneClick,
        mouseover: mouseoverColor,
        mouseout: mouseleaveColor
      }
    )
  }
  return (<GeoJSON attribution={attribution} data={(municipalitiesGeoJSON as FeatureCollection)} onEachFeature={onEachMunicipality} />)

}

const PopContent: React.FC<any> = ({ props }) => {
  return (
    <div className={styles.popup}>
      <h2>{`${props.name}:`}</h2>
      <ul>
        {props.groups.map((g: any) => {
          return (
            <li key={g.id}>
              <div className={styles.icon}>
                <SvgIcon {...{id: logo.id}}/>
              </div>
              {/* <img className={styles.logo} src={logo.url.replace("%PUBLIC_URL%", process.env.PUBLIC_URL)} alt="logo" /> */}
              {/* {POPUP FORCES STRING - NO ONCLICK} UGLY HREF*/}
              <a href={`${window.location.pathname}#/group/${g.id}`}>
                <Button label={g.navn}/>
              </a>
              <a href={`${g.links[0]}`} rel="noreferrer" target="_blank">
                <img className={styles.linkIcon} src={`${process.env.PUBLIC_URL}/logo/facebook_21.svg`} alt="facebook" />
              </a>
            </li>
          )
        })}
      </ul>

    </div>)
}