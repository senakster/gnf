type TGNFGrupper = {
    grupper: TGNFG[];
}
type THateoasLink = {
    rel: 'self' | 'update' | 'delete';
    type: 'GET' | 'PUT' | 'DELETE';
    href: string;
}

type TLink = {
    name: string;
    url: string;
    description?: string;
    _links?: THateoasLink[];
}
type TGNFG = {
    id: string;
    grouptype: string;
    name: string;
    _links?: THateoasLink[];
    _embedded?: {
        grouplinks: TLink[];
    }
    description: string;
    municipality: string;
    status?: 'active' | 'inactive';
}

type IReduceCall = {
    type: string;
    payload?: string | number;
}

type TServerResponse = {
    data: any;
    status: 'ok' | 'fail' | 'none';
    message: string;
}

type TResource = {
    data: any[];
}