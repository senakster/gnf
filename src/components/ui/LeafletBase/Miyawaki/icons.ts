import img from '_libs/_media/img/images'
import sprites from '_libs/_media/img/svg-defs.svg';

import L from 'leaflet'

const treesIcon = new L.Icon({
    iconUrl: `${img.trees_icon.url.replace('%PUBLIC_URL%', process.env.PUBLIC_URL)}`,
    iconRetinaUrl: `${img.trees_icon.url.replace('%PUBLIC_URL%', process.env.PUBLIC_URL)}`,
    iconSize: new L.Point(35, 35),
    className: 'leaflet-miyawaki-icon'
});

const seedlingIcon = new L.Icon({
    iconUrl: `${img.seedling_icon.url.replace('%PUBLIC_URL%', process.env.PUBLIC_URL)}`,
    iconRetinaUrl: `${img.seedling_icon.url.replace('%PUBLIC_URL%', process.env.PUBLIC_URL)}`,
    iconSize: new L.Point(35, 35),
    className: 'leaflet-miyawaki-icon'
});

const leafIcon = new L.Icon({
    iconUrl: `${img.simple_leaf_icon.url.replace('%PUBLIC_URL%', process.env.PUBLIC_URL)}`,
    iconRetinaUrl: `${img.simple_leaf_icon.url.replace('%PUBLIC_URL%', process.env.PUBLIC_URL)}`,
    iconSize: new L.Point(35, 35),
    className: 'leaflet-miyawaki-icon'
});
const miyawakiIcon = new L.Icon({
    iconUrl: `${img.miyawaki_icon.url.replace('%PUBLIC_URL%', process.env.PUBLIC_URL)}`,
    iconRetinaUrl: `${img.miyawaki_icon.url.replace('%PUBLIC_URL%', process.env.PUBLIC_URL)}`,
    iconSize: new L.Point(35, 35),
    className: 'leaflet-miyawaki-icon'
});

const miyawakiIconStartup = new L.Icon({
    iconUrl: `${img.miyawaki_icon_startup.url.replace('%PUBLIC_URL%', process.env.PUBLIC_URL)}`,
    iconRetinaUrl: `${img.miyawaki_icon_startup.url.replace('%PUBLIC_URL%', process.env.PUBLIC_URL)}`,
    iconSize: new L.Point(35, 35),
    className: 'leaflet-miyawaki-icon'
});

const icons = {
    treesIcon,
    seedlingIcon,
    leafIcon,
    miyawakiIcon,
    miyawakiIconStartup
}

export default icons