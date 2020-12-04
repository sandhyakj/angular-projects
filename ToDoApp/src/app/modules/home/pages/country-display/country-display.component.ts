import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataService} from '../../../../core/services/data.service';
import { countryDetail } from '../../../../shared/models/countryDetail.model';

@Component({
  selector: 'app-country-display',
  templateUrl: './country-display.component.html',
  styleUrls: ['./country-display.component.scss']
})
export class CountryDisplayComponent implements OnInit, OnDestroy {
  
  private unsubscribe:Subscription[] =[];
  public countryDetails!: countryDetail;

  constructor(private dataService:DataService) { }

  ngOnInit(): void {
    const countryStream = this.dataService.getCountryDetails().subscribe(response=>{
      this.countryDetails = {...response};
    },error=>{
      alert("There was problem during retrival")
    });
    this.unsubscribe.push(countryStream);
  }

  ngOnDestroy(): void{
    this.unsubscribe.forEach(sb=>{
      sb.unsubscribe();
    });
  }
}
