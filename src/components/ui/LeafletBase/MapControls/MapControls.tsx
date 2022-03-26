import React from 'react'
import { useMap } from "react-leaflet"
import { useStateContext } from "_libs/_state"
import { ActionType } from "_libs/_state/reducers/messageReducer"
import config from '_libs/_config'
import { LatLngBoundsExpression } from 'leaflet'


const MapControls: React.FC = () => {
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
        const mapY = document.getElementById('LeafletBase')
        defaultZoom();

        function locationFound(e: { latlng: L.LatLng, bounds: L.LatLngBounds }) {
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


        // ATTRIBUTIONS
        parentMap.attributionControl.addAttribution('<a target="_blank" rel="noreferrer" href="//github.com/senakster/gnf">github</a>');
        // parentMap.attributionControl.addAttribution('<a href="mailto:senakster@gmail.com">Emil Nakayama</a>');
        parentMap.attributionControl.addAttribution(`v: ${config.app.version}`);

        // GPS EVENTSLISTENERS
        parentMap.addEventListener('locationfound', locationFound)
        parentMap.addEventListener('locationerror', locationError)
        return () => {
            parentMap.removeEventListener('locationfound', locationFound)
            parentMap.removeEventListener('locationerror', locationError)
        };
        // Disable lint - controlling rerenders
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [])

    const POSITION_CLASSES = {
        bottomleft: 'leaflet-bottom leaflet-left',
        bottomright: 'leaflet-bottom leaflet-right',
        topleft: 'leaflet-top leaflet-left',
        topright: 'leaflet-top leaflet-right',
    }

    function defaultZoom() {
        parentMap.flyToBounds(snaptobounds, { duration: .25 })
        const mapY = document.getElementById('LeafletBase')
        window.scrollTo({
            top: mapY?.offsetTop || 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    function whereAmI() {
        parentMap.locate({
            timeout: 2000,
        })
    }
    return (
        <>
            <div className={POSITION_CLASSES.topright}>
                <div className="leaflet-control leaflet-bar">
                    <span onClick={defaultZoom} className="leaflet-control-zoom-in mapControl" title="Default Zoom" aria-label="Default Zoom"><i className="material-icons">fullscreen</i></span>
                    <span onClick={whereAmI} className="leaflet-control-zoom-in mapControl" title="Locate" aria-label="Locate"><i className="material-icons">my_location</i></span>
                </div>
            </div>
            <div className={POSITION_CLASSES.bottomleft}>
            </div>


        </>
    )
}

export default MapControls;