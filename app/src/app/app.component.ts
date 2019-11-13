import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';

import axios from 'axios';

export interface PeriodicElement {
  index: string;
  title: string;
  partnerId: string;
  ean: string;
  price: number;
  sellPrice: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }

  ngOnInit() {
    this.retornaSkus();
  }

  publicado = true;
  dataSource = [];
  title = 'app';
  displayedColumns: string[] = ['index', 'title', 'partnerId', 'ean', 'price', 'sellPrice'];

   retornaSkus = async () => {
    try {
        const result = await axios.get('http://localhost:4444/skus');

        this.dataSource = result.data;
        return;

    } catch ( error ) {
        return error;
    }
  }

  publicarSkus = async () => {
    this.publicado = false;
    this.dataSource.map(async sku => {
      try {
        await axios.post('http://localhost:5555/sku', sku);
      } catch(err) {
        console.log(err);
      }
    })

    this.publicado = true;
  }
}


