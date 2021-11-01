// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CardGenerator from './CardGenerator/CardGenerator.lazy';
import Error from './Error/Error.lazy'
import Home from './Home/Home.lazy';
import Map from './Map/Map.lazy'
import Search from './Search/Search.lazy';

const views = [
    { name: "Home", path: "/", Component: Home },
    { name: "Search", path: "/search", Component: Search },
    { name: "Map", path: "/map", Component: Map },
    // { name: "QR-Generator", path: "/generator", Component: CardGenerator },
    { name: "Error", path: "/**", Component: Error },
];

export default views;