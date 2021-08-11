import Error from './Error/Error.lazy'
import Group from './Group/Group.lazy';
import Home from './Home/Home.lazy';
import Map from './Map/Map.lazy'

const views = [
    { name: "Hjem", path: "/", Component: Home },
    { name: "Grupper", path: "/group", Component: Group },
    { name: "Gruppe Detailler", path: "/group/:groupId", Component: Group },
    { name: "Kort", path: "/map", Component: Map },
    { name: "Error", path: "/**", Component: Error },
];

export default views;