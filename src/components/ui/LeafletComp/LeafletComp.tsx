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
import GNFGrupper from '_data/GNF-Grupper-new.json'
import config from '_config/config.json'
import L, { LatLngBoundsExpression } from 'leaflet';
import Button from '../Button/Button';
import { logo } from '_data/images.json'

const LeafletComp: React.FC = () => {
  React.useEffect(() => {
    window.scrollTo({
      top: window.innerHeight*.5,
      left: 0,
      behavior: 'smooth'
    });
  },[])
  const [state, setState] = React.useState({tileLayer: false})

  function toggleTiles () {
    setState({
      ...state,
      tileLayer: !state.tileLayer
    })
  }

  const c: L.LatLng = new L.LatLng(config.map.centerDefault.lat, config.map.centerDefault.lng);
  return (
    <div id='' className={styles.LeafletComp} data-testid="LeafletComp">
      <MapContainer
        className={styles.mapContainer}
        center={[c.lat, c.lng]}
        zoom={6}
        scrollWheelZoom={true} 
        >
        { state.tileLayer && <TileLayer
          // {...mapTilesets.dark}
          {...mapTilesets.light}
        />}
        <GeoData />
        <MapControls active={state.tileLayer} toggleTiles={toggleTiles}/>
      </MapContainer>
    </div>
  );
}

export default LeafletComp;


const MapControls: React.FC<any> = ({active ,toggleTiles}) => {
  // const parentMap = useMap()
  const POSITION_CLASSES = {
    bottomleft: 'leaflet-bottom leaflet-left',
    bottomright: 'leaflet-bottom leaflet-right',
    topleft: 'leaflet-top leaflet-left',
    topright: 'leaflet-top leaflet-right',
  }
  return (
    <div className={POSITION_CLASSES.bottomleft}>
      <div className="leaflet-control leaflet-bar">
        <Button onClick={toggleTiles} label={active ? `hide tiles` : `show tiles`}/>
      </div>
    </div>
  )
}
const GeoData: React.FC = () => {
  const gnfgreen: string = "#1db954"
  // const defaultFill = '#a1d100';
  const defaultFill = gnfgreen;
  const highlightFill = `dodgerblue`;

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
    map.setMinZoom(map.getZoom())
    // console.log(map)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

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
      fillOpacity: .2,
    })
  }
  function mouseleaveColor(event: L.LeafletMouseEvent) {
    const groups = GNFGrupper.grupper?.filter((gg) => 
      gg.kommune.toUpperCase() === event.target.feature.properties.name.toUpperCase()
    // compare(gg.kommune, event.target.feature.properties.name)
    );
    event.target.setStyle({
      fillColor: groups.length > 0 ? defaultFill : defaultFill,
      fillOpacity: groups.length > 0 ? .5 + .1 * groups.length : .1,
    })
  }

  function onEachMunicipality(data: any, layer: L.Layer | any) {
    const groups = GNFGrupper.grupper?.filter((gg) => 
    gg.kommune.toUpperCase() === data.properties.name.toUpperCase()
    );
    // console.log(GNFGrupper.grupper)
    groups.length > 0 && layer.bindPopup(ReactDOMServer.renderToString(<PopContent props={{ ...data.properties, groups: groups }} />))
    // GNFGrupper.grupper.forEach((g) => console.log(g.kommune))
    // console.log(data.properties.name)
    layer.bindTooltip(`${data.properties.name}: ${groups.length} ${groups.length === 1 ? 'gruppe' : 'grupper'}`)

    layer.options = {
      ...layer.options,
      color: defaultFill,
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
  return (<GeoJSON data={(municipalitiesGeoJSON as FeatureCollection)} onEachFeature={onEachMunicipality} />)

}

const PopContent: React.FC<any> = ({ props }) => {
  return (
  <div className={styles.popup}>
    <h1>{`${props.name}:`}</h1>
    <ul>
      {props.groups.map((g: any) => {
        return (
          <li key={g.id}>
            {/* {POPUP FORCES STRING - NO ONCLICK} UGLY HREF*/}
            <img className={styles.logo} src={logo.replace("%PUBLIC_URL%",process.env.PUBLIC_URL)} alt="logo"/>


            {/* <a href={`${window.location.pathname}#/group/${g.id}`}>
            <Button label={g.navn} 
            // className={'big'}
            />
            </a> */}
            <span className={`${styles.groupName} themed-title`}>{` ${g.navn}: `}</span>
            <a href={`${g.links[0]}`} rel="noreferrer" target="_blank">
              {/* <Button label={g.name} /> */}
              <img className={styles.linkIcon} src={`${process.env.PUBLIC_URL}/logo/facebook_21.svg`} alt="facebook" />
            </a>
          </li>
        )
      })}
    </ul>

  </div>)
}