type TGNFGrupper = {
    grupper: TGNFG[];
}
type TGNFG = {
    id: string;
    type: string;
    navn: string;
    links: string[];
    beskrivelse: string;
    kommune: string;
    img?: string;
}