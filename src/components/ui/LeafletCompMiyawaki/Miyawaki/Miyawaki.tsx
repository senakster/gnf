import {  LatLngExpression } from 'leaflet'
import React from 'react'
import { Marker, Popup, Tooltip, useMap } from 'react-leaflet'
import icons from './icons'
import '_libs/_styles/icons.scss'
import ModalContent from './ModalContent'
import PopContent from './PopContent'
import { useStateContext } from '_libs/_state'
import { ActionType } from '_libs/_state/reducers/stateReducer'
import mockdata from './MiyawakiData'
import Legend from './Legend'
export type TMiyawakiInfo  = {
    type: 'img'| 'text'| 'link'; 
    description: string;
    content: string;
}
export type TMiyawakiData = {
    id: string;
    status: 'forest' | 'project' | 'prospect';
    name: string;
    municipality: string;
    LatLng: LatLngExpression;
    info: TMiyawakiInfo[];
    data: {name: string, value: string | number}[];
}

const Miyawaki: React.FC<any> = () => {
    const {dispatch} = useStateContext()
    const [state, setState] = React.useState({
        ui: {
            modal: '',
        }
    }
    )
    const map = useMap();
    function lockMap(){
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
        document.body.style.overflow = 'hidden';
    }
    function unlockMap() {
        map.dragging.enable();
        map.touchZoom.enable();
        map.doubleClickZoom.enable();
        map.scrollWheelZoom.enable();
        map.boxZoom.enable();
        map.keyboard.enable();
        document.body.style.overflow = 'auto';
    }
    function handleClick(id: string){
        // const value = id === state.ui.modal ? '' : id
        
        // console.log(id, mockdata.find((d) => d.id === id))


        dispatch && dispatch({
            type: ActionType.SET_MODAL,
            payload: <ModalContent {...{ active: true, data: mockdata.find((d) => d.id === id )}}/>
        })


        // value === '' ? unlockMap() : lockMap()
        // setState({
        //     ...state,
        //     ui: {
        //         ...state.ui,
        //         modal: value
        //     }

        // })
    }

    return(
    <>
        <Legend />
        {mockdata.map((d, i) => 
            <Marker 
            key={i} 
            position={d.LatLng} 
            icon={
                d.status === 'forest' ? 
                icons.treesIcon: 
                d.status === 'project' ?
                icons.seedlingIcon :
                icons.leafIcon
            } 
            eventHandlers={{
                click: () => handleClick(d.id)
            }}
            >
                <Tooltip 
                direction="bottom"
                offset={[10, 30]}
                >
                    {d.name}
                </Tooltip>
                {/* <ModalContent data={d} active={state.ui.modal === d.id} {...{handleClick,}}/> */}
                {/* <Popup>
                    <PopContent data={d} active={state.ui.modal === d.id} {...{ handleClick, }} />
                </Popup> */}
            </Marker>
        )}
    </>)
}

export default Miyawaki
