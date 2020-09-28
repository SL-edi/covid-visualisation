import { byCountryCode, byName } from 'country-finder';

/** Holds total case data for a location *(in alpha2 format)* on a date *(in UTC string format)* */
export class CovidDataPoint {
  readonly location: string;
  readonly date: string;

  /**
   * Holds Covid case data for a location for a date
   *
   * @param location    The location (not case sensitive) corresponding to
   *  the data ideally in alpha2/alpha3 format or "global".
   *  Using the country name is also possible but is not as reliable
   *  due to spelling differences.
   * @param date        The date corresponding to the data as UTC string format
   * @param confirmed   The total confirmed cases up to the date
   * @param dead        The total dead cases up to the date
   * @param recovered   The total recovered cases up to the date
   */
  constructor(
    location: string,
    date: Date,
    readonly confirmed: number,
    readonly dead: number,
    readonly recovered: number
  ) {
    if (location.length === 2 ) {
      this.location = byCountryCode(location).iso2;
    } else if (location.toLowerCase() === 'global') {
      this.location = 'Global';
    } else if (location.length === 3) {
      this.location = byCountryCode(location).iso2;
    } else {
      this.location = byName(location).iso2;
    }
    this.date = date.toUTCString();
    this.confirmed = confirmed;
    this.dead = dead;
    this.recovered = recovered;
  }
}
