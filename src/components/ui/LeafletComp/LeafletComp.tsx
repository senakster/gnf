import React from 'react';
import ReactDOMServer from "react-dom/server";
import '_libs/_styles/leaflet.scss';
import '_libs/_styles/icons.scss';
import styles from './LeafletComp.module.scss';
import { FeatureCollection } from 'geojson';
import {
  MapContainer, TileLayer, useMap, GeoJSON,
  // Marker, Popup, Polyline, Polygon, useMapEvents 
} from 'react-leaflet';
import { mapTilesets } from '_libs/_themes'
import municipalitiesGeoJSON from '_libs/_data/denmark-municipalities.json'
import config from '_libs/_config/config.json'
import L, { LatLngBoundsExpression } from 'leaflet';
import { logo } from '_libs/_media/img/images.json'
import { DefaultTheme, useTheme } from 'styled-components';
import { ActionType, useStateContext } from '_libs/_state';
import Loading from 'components/global/Loading/Loading';
import SvgIcon from '../SvgIcon/SvgIcon';
import { useTranslation } from 'react-i18next';
import Legend from '../LeafletCompMiyawaki/Miyawaki/Legend';

const LeafletComp: React.FC<any> = ({variant}) => {
  const { data } = useStateContext().state.state;
  const [state, setState] = React.useState({ tileLayer: false})

  function toggleTiles() {
    setState({
      ...state,
      tileLayer: !state.tileLayer
    })
  }

  const c: L.LatLng = new L.LatLng(config.map.centerDefault.lat, config.map.centerDefault.lng);
  return (
    data.grupper.length > 0 && data.updated > 0  ? 
    <div id='LeafletMap' className={`${styles.LeafletComp} ${variant && styles[variant]}`} data-testid="LeafletComp">
      
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
        <GeoData 
        attribution="<a href='https://github.com/magnuslarsen/geoJSON-Danish-municipalities'>GeoJson</a>" 
        grupper={data.grupper} />
        <MapControls active={state.tileLayer} fn={{ toggleTiles }} />
        {/* <Miyawaki /> */}
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
    topcenter: 'leaflet-top',
  }

  function defaultZoom() {
    parentMap.flyToBounds(snaptobounds, {duration: .25})
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
      <Legend />
      <div className={POSITION_CLASSES.topright}>
        <div className="leaflet-control leaflet-bar">
          {/* <span onClick={scrollToTop} className="leaflet-control-zoom-in mapControl circleIcon" title="Scroll to Top" aria-label="Scroll to Top">&#x21EB;</span> */}
          <span onClick={defaultZoom} className="leaflet-control-zoom-in mapControl" title="Default Zoom" aria-label="Default Zoom"><i className="material-icons">fullscreen</i></span>
          <span onClick={whereAmI} className="leaflet-control-zoom-in mapControl" title="Locate" aria-label="Locate"><i className="material-icons">my_location</i></span>
        </div>
      </div>
      <div className={POSITION_CLASSES.bottomright}>
        {/* <div className="leaflet-control leaflet-bar">
        <Button onClick={fn.toggleTiles} label={active ? `hide tiles` : `show tiles`}/>
      </div> */}
      </div>
    </>
  )
}

const GeoData: React.FC<{ grupper: TGNFG[], attribution: string }> = ({ grupper, attribution }) => {
  const { t } = useTranslation('map');
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
    // map.setMinZoom(map.getZoom() - .5)
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
      event.target.feature.properties.name.toUpperCase().indexOf(gg.municipality.toUpperCase()) !== -1
      // compare(gg.municipality, event.target.feature.properties.name)
    );
    event.target.setStyle({
      fillColor: groups.length > 0 ? defaultFill : defaultFill,
      fillOpacity: groups.length > 0 ? .5 + .1 * groups.length : .1,
    })
  }

  /**
   * 
   * @param data {GEOJSON loop}
   * @param layer {Leaflet Layer}
   */
  function onEachMunicipality(data: any, layer: L.Layer | any) {
    // Groups Matching Municipality
    const groups = grupper?.filter((gg) =>
      data.properties.name.toUpperCase().indexOf(gg.municipality.toUpperCase()) !== -1
    )
    //   gg.municipality.toUpperCase() === data.properties.name.toUpperCase() || 
    //   gg.municipality.toUpperCase() === `${data.properties.name.toUpperCase()} KOMMUNE` ||
    //   gg.municipality.toUpperCase() === `${data.properties.name.toUpperCase()}S KOMMUNE`
    // );


    // console.log(data, grupper);

    // groups.length > 0 && 
    layer.bindPopup(ReactDOMServer.renderToString(<PopContent props={{ ...data.properties, groups: groups, t }} />))

    /** TOOLTIP */
    // layer.bindTooltip(`${data.properties.name}: ${groups.length} ${groups.length === 1 ? 'gruppe' : 'grupper'}`)

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
    const t = props.t;
   return (
    <div className={styles.popup}>
      <h2 className={styles.municipality}>{`${props.name}:`}</h2>
      <div className={styles.listContent}>
      <ul>
        {props.groups.map((g: TGNFG) => {
          const links = g._embedded?.grouplinks || []
          return (
            <li key={g.id} className={`${styles[g.grouptype]}`}>
              <div className={styles.icon}>
                <SvgIcon width={`2.5em`} {...{id: logo.id}}/>
              </div>
              {/* <img className={styles.logo} src={logo.url.replace("%PUBLIC_URL%", process.env.PUBLIC_URL)} alt="logo" /> */}
              {/* {POPUP FORCES STRING - NO ONCLICK} UGLY HREF*/}
              {/* {<a href={`${window.location.pathname}#/group/${g.id}`}>
                <Button label={g.navn}/>
              </a>} */}
              <span className={`${styles.groupName} `}>{g.name}</span>
              <div className={styles.icons}>
                {links.map((l: TLink, i: number) => 
                  <a key={i} href={`${l.url}`} rel="noreferrer" target="_blank">
                    <SvgIcon width={`2.5em`} {...{ id: l.name || 'linkicon  ' }} />
                  </a> 
                )}

              </div>
            </li>
          )
        })}
        <li className={styles.join}>              
          <h1>+</h1>
          <span>{t('popup.join')}</span>
          <div className={styles.icons}>
              <a href={`mailto:${config.contact.email}`} rel="noreferrer" target="_blank">
                <SvgIcon width={`2.5em`}{...{ id: 'email'}} />
              </a>
              <a href={config.contact.facebook} rel="noreferrer" target="_blank">
                <SvgIcon width={`2.5em`} {...{ id: 'facebook' }} />
              </a>
          </div>
            
        </li>
      </ul>
         <div className={styles.joinText}>
           {t('popup.contactUs')}: <br />
           <a href={`mailto:${config.contact.email}`}>info@omstilling.nu</a><br />
           {t('w.or')}<br />
           <a target="_blank" rel="noreferrer" href={`${config.contact.facebook}`}>www.facebook.com/groennenabofaellesskaber</a><br />
         </div>
      </div>

    </div>)
}