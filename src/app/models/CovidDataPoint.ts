import isoLookup from 'iso-3166-1';

/** Holds total case data for a location *(in alpha2 format)* on a date *(in UTC string format)* */
export class CovidDataPoint {
  readonly location: string;
  readonly date: string;

  /**
   * Holds Covid case data for a location for a date
   * 
   * @param {string}  location    The location (not case sensitive) corresponding to the data ideally in alpha2/alpha3 format or "global". Using the country name is also possible but is not as reliable due to spelling differences.
   * @param {Date}    date        The date corresponding to the data as UTC string format
   * @param {number}  confirmed   The total confirmed cases up to the date
   * @param {number}  dead        The total dead cases up to the date
   * @param {number}  recovered   The total recovered cases up to the date
   */
  constructor(
    location: string,
    date: Date,
    readonly confirmed: number,
    readonly dead: number,
    readonly recovered: number
  ) {
    if (location.length === 2 ) {
      this.location = isoLookup.whereAlpha2(location).alpha2;
    } else if (location.toLowerCase() === "global") {
      this.location = "Global"
    } else if (location.length === 3) {
      this.location = isoLookup.whereAlpha3(location.toUpperCase()).alpha2
    } else {
      this.location = isoLookup.whereCountry(location).alpha2
    }
    this.date = date.toUTCString();
    this.confirmed = confirmed;
    this.dead = dead;
    this.recovered = recovered;
  }
}
