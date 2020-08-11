import isoLookup from 'iso-3166-1';

/** Holds total case data for a location *(in alpha2 format)* on a date *(in UTC string format)* */
export class CovidDataPoint {
  readonly location: string;
  readonly date: string;
  readonly confirmed: Number;
  readonly dead: Number;
  readonly recovered: Number;

  /**
   * Holds Covid case data for a location for a date
   * 
   * @param {string}  location    The location corresponding to the data in alpha2 format or "Global"
   * @param {Date}    date        The date corresponding to the data as UTC string format
   * @param {Number}  confirmed   The total confirmed cases up to the date
   * @param {Number}  dead        The total dead cases up to the date
   * @param {Number}  recovered   The total recovered cases up to the date
   */
  constructor(
    location: string,
    date: Date,
    confirmed: Number,
    dead: Number,
    recovered: Number
  ) {
    if (location.length === 2 ) {
      this.location = isoLookup.whereAlpha2(location).alpha2;
    } else if (location === "Global") {
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
