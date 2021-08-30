import Axios from 'axios'
import GNFGrupper from './GNF-Grupper-new.json'
import { app } from '_config/config.json'

export async function getGnfGrupper () {
    try {
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                // ...authHeader()
            }
        }
        /** FORCE RELOAD */
        const response = await Axios.get(`${app.dataurl}?v=${new Date().getTime()}`, requestOptions)
        console.log('Data Collected')
        // const response = await Axios.get(`${app.dataurl}?v=${new Date().getDate()}`, requestOptions)
        
        return response
    } catch (error) {
        // console.error(error)
        return error
    }
};

export const data = {
    grupper: GNFGrupper.grupper,
    getGrupper: getGnfGrupper
}

export default data;

function handleResponse(response) {
    response.then &&
        response
            .then((response) => {
                console.log(response.data);
                return response.data;
            })
            .catch((error) => {
                console.log(error);
            });
    // return response.data;
}