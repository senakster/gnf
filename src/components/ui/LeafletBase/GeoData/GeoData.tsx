import React from 'react'
// import ReactDOMServer from 'react-dom/server';
import config from '_libs/_config/config.json'
import { FeatureCollection } from 'geojson';
import { 
    // FeatureGroup, 
    LatLngBoundsExpression } from 'leaflet';
import municipalitiesGeoJSON from '_libs/_data/denmark-municipalities.json'
// import { useTranslation } from 'react-i18next';
import { useMap, GeoJSON } from 'react-leaflet';
import { DefaultTheme, useTheme } from 'styled-components';
// import PopContent from './PopContent';


const GeoData: React.FC<{ grupper: TGNFG[], attribution: string, setModalContent: (data: any) => void }> = ({ grupper, attribution, setModalContent }) => {
    // const { t, ready } = useTranslation('map');
    const [ ui, setUI ] = React.useState({
        municipality: false,
    })
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
    const emptyColor = 'beige' || 'white';
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
        // map.fitBounds(bounds)
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
        const { properties } = event.target.feature;
        const groups = grupper?.filter((gg) =>
            properties.name.toUpperCase().indexOf(gg.municipality.toUpperCase()) !== -1
        )
        setUI({
            ...ui,
            municipality: properties.name
        })
        // console.log('kommuneClick', properties)
        setModalContent({municipality: properties.name, groups})
        fitBounds(getBboxFromCoords(event))
    }
    function mouseoverColor(event: L.LeafletMouseEvent) {
        // console.log(event.target.setStyle);
        event.target.setStyle({
            fillColor: highlightFill,
            fillOpacity: 1,
            weight: 5
        })
    }
    function mouseleaveColor(event: L.LeafletMouseEvent) {
        const groups = grupper?.filter((gg) =>
            event.target.feature.properties.name.toUpperCase().indexOf(gg.municipality.toUpperCase()) !== -1
            // compare(gg.municipality, event.target.feature.properties.name)
        );
        event.target.setStyle({
            fillColor: groups.length > 0 ? defaultFill : emptyColor,
            fillOpacity: groups.length > 0 ? .5 + .1 * groups.length : 1,
            weight: 3
        })
    }

    /**
     * 
     * @param data {GEOJSON loop}
     * @param layer {Leaflet Layer}
     */
    function onEachMunicipality(data: any, layer: L.Layer | any) {
        // console.log(data);
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
        // layer.bindPopup(ReactDOMServer.renderToString(<PopContent {{ ...name: data.properties.name, groups: groups, t }} />))

        /** TOOLTIP */
        // layer.bindTooltip(`${data.properties.name}: ${groups.length} ${groups.length === 1 ? 'gruppe' : 'grupper'}`)
        layer.bindTooltip(`${data.properties.name}`)

        layer.options = {
            ...layer.options,
            color: mapStroke,
            fillColor:  groups.length > 0 ? defaultFill : emptyColor,
        }

        layer.options = groups.length > 0 ? {
            ...layer.options,
            fillOpacity: .5 + .1 * groups.length
        } :
            {
                ...layer.options,
                fillOpacity: 1,
            }

        layer.on(
            {
                click: kommuneClick,
                mouseover: mouseoverColor,
                mouseout: mouseleaveColor
            }
        )
        // console.log(layer)
    }
    function onEachMunicipality_noGroups(data: any, layer: L.Layer | any) {
        layer.bindTooltip(`${data.properties.name}`)
        layer.options = {
            ...layer.options,
            color: mapStroke,
            fillColor: defaultFill,
            fillOpacity: .5,
        }
    }
    return (
    <GeoJSON 
    attribution={attribution} 
    data={(municipalitiesGeoJSON as FeatureCollection)} 
    onEachFeature={onEachMunicipality}
    // onEachFeature={onEachMunicipality_noGroups}
    />)

}
export default GeoData