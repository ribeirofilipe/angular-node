import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

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
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.retornaSkus();
  }

  dataSource = new MatTableDataSource<PeriodicElement>([]);

  displayedColumns: string[] = ['index', 'title', 'partnerId', 'ean', 'price', 'sellPrice'];

  publicado = true;
  title = 'app';
  startTime = new Date();
  endTime = new Date();

   retornaSkus = async () => {
    try {
        const result = await axios.get('http://localhost:4444/skus');
        this.dataSource = new MatTableDataSource<PeriodicElement>(result.data);
        this.dataSource.paginator = this.paginator;
        return;

    } catch ( error ) {
        return error;
    }
  }

  publicarSkus = async () => {
    this.publicado = false;
    const array = this.dataSource.data.map(async sku => {
        const response = await axios.post('http://localhost:5555/sku', sku);
        return response.data;
    });

    const skus = await Promise.all(array);
    this.publicado = true;
    var tempoTotal = this.endTime.getTime() - this.startTime.getTime() / 1000;

    alert(`${this.dataSource.data.length} Skus publicados em: ${new Date(tempoTotal).getSeconds()} segundos.`);
    return skus;
  }
}


