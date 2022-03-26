import Axios, { AxiosResponse } from 'axios'
import GNFGrupper from './GNF-Grupper-new.json'
import { app } from '_libs/_config/config.json'

export async function getGnfGrupper(): Promise<AxiosResponse<TServerResponse>>  {
    try {
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                // ...authHeader()
            }
        }
        /** FORCE RELOAD */
        const response = await Axios.get(`${app.dburl}?v=${new Date().getTime()}`, requestOptions)
        console.log('Data Collected')
        // const response = await Axios.get(`${app.dataurl}?v=${new Date().getDate()}`, requestOptions)
        
        return response
    } catch (error: any) {
        return error;
    }
};

export async function getGnfGrupperREST(): Promise<AxiosResponse<any[]>> {
    try {
        const requestOptions = {
            headers: {
                'Content-Type': 'application/json',
                // ...authHeader()
            }
        }
        const response = await Axios.get(`${app.RESTurl}/groups`, requestOptions)
        console.log('Data Collected')
        // const response = await Axios.get(`${app.dataurl}?v=${new Date().getDate()}`, requestOptions)

        return response
    } catch (error: any) {
        return error;
    }
};

export const data = {
    grupper: GNFGrupper.grupper,
    getGrupper: getGnfGrupper
}

export default data;