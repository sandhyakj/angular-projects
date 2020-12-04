import { NumberSymbol } from '@angular/common';

export interface countryDetail {
    name:string;
    topLevelDomain:Array<string>;
    alpha2Code:string;
    alpha3Code:string;
    capital:string;
    allingCodes:Array<string>;
    altSpellings:Array<string>;
    region:string;
    subregion:string;
    population:number;
    latlng:Array<number>;
    demonym:string;
    area:number;
    gini:number;
    timezones:Array<string>;
    borders:Array<string>;
    nativeName:string;
    numericCode:string;
    currencies:Array<any>;
    languages:Array<any>;
    translations:object;
    flag:string;
    regionalBlocs:Array<any>;
    cioc:string;
 }