type TGNFGrupper = {
    grupper: TGNFG[];
}

type TLink = {
    name: string;
    url: string;
    description?: string; 
}
type TGNFG = {
    groupid: string;
    grouptype: string;
    name: string;
    // links: TLink[];
    links: string; //JSON STRING
    description: string;
    municipality: string;
    status?: 'active' | 'inactive';
    img?: string;
    onClick?: () => void;
    value?: string | number; 
}
// type TGNFG = {
//     id: string;
//     type: string;
//     navn: string;
//     links: string[];
//     beskrivelse: string;
//     kommune: string;
//     img?: string;
//     onClick?: () => void;
//     value?: string | number; 
// }
type IReduceCall = {
    type: string;
    payload?: string | number;
}

type TServerResponse = {
    data: any;
    status: 'ok' | 'fail' | 'none';
    message: string;
}