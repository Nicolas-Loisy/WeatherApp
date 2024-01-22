import aRestService from "../models/abstract/aRestService";
import iServiceGeographie from "../models/interface/iServiceGeographie";
import lieuType from "../models/types/lieuType";

type lieu_OW = {
  name: string;
  local_names?: {
    fr?: string;
    oc?: string;
  };
  lat: number;
  lon: number;
  country: string;
  state: string;
}

type JSON_OW = lieu_OW[];

export default class ServiceGeographieOW extends aRestService implements iServiceGeographie {
    constructor(baseUrl: string) {
      super(baseUrl);
    }
  
    public async rechercheLieux(nomLieu: string): Promise<lieuType[]> {
      // Implemente la méthode a partir d'une API REST
      const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY ?? "";
      const limitApiResult = process.env.LIMIT_API_RESULT ?? 5;
      
      const urlLieux: string = `direct?q=${nomLieu}&limit=${limitApiResult}&appid=${openWeatherApiKey}`;
      const JSONdata = await this.get(urlLieux) as unknown as JSON_OW;

      let lieux: lieuType[] = [];
      
      JSONdata.forEach(lieu => {
        lieux.push({
          name: lieu.name,
          lat: lieu.lat,
          lon: lieu.lon,
          country: lieu.country,
          state: lieu.state
        } as lieuType)
      });

      return lieux;
    }
}