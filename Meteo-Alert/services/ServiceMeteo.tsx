import aRestService from "../models/abstract/aRestService";
import UniteCoordonnee from "../models/datatype/UniteCoordonnee";
import SystemeMesure from "../models/enum/SystemeMesure";
import iServiceMeteo from "../models/interface/iServiceMeteo";

export default class ServiceMeteo extends aRestService implements iServiceMeteo {
    constructor(baseUrl: string) {
      super(baseUrl);
    }
  
    public async getMeteo(longitude: UniteCoordonnee, latitude: UniteCoordonnee, units: SystemeMesure): Promise<Response> {
      // Implemente la méthode a partir d'une API REST
      const openWeatherApiKey = process.env.OPEN_WEATHER_API_KEY ?? "";

      const urlMeteo: string = `/weather?lat=${longitude.getValeur()}&lon=${latitude.getValeur()}&appid=${openWeatherApiKey}&units=${units}`;
      
      const meteo: Response = await this.get(urlMeteo);
      return meteo;
    }
}