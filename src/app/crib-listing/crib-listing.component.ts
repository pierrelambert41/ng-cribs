import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CribsService } from './../services/cribs.service';
import { UtilService } from './../services/util.service';

@Component ({
  selector: 'app-crib-listing',
  templateUrl: './crib-listing.component.html',
  styleUrls: ['./crib-listing.component.css']
})
export class CribListingComponent implements OnInit {

  cribs: Array<any>;
  error: string;
  sortField: string = 'price';
  sortDirection: string = 'asc';
  sortFields: Array<string> = [
    'address',
    'area',
    'bathrooms',
    'bedrooms',
    'price',
    'type'
  ];

  constructor(
    private http: HttpClient,
    private cribsService: CribsService,
    private utilService: UtilService
    ) { }

  ngOnInit() {

    this.cribsService.getAllCribs()
    .subscribe(
      data => this.cribs = data as any,
      error => this.error = error.statusText
    );

    this.cribsService.newCribSubject.subscribe(data => this.cribs = [data, ...this.cribs]);
  }

}
