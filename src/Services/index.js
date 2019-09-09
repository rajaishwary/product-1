import { getFetch } from "../Utils/apiUtils";

export const BASE_URL = "http://in.bookmyshow.com";

export function getTrailersApi() {
  return getFetch(`${BASE_URL}/serv/getData?cmd=GETTRAILERS&mtype=cs`);
}
