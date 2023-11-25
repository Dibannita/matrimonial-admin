import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import * as ApexCharts from 'apexcharts';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {

  isBrowser: boolean;


  constructor(
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    const options  = {
      series: [
        {
          name: 'Daily Sale',
          type: 'column',
          data: [440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]
        },
        // {
        //   name: 'Daily Profit',
        //   type: 'line',
        //   data: [23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]
        // }
      ],
      chart: {
        height: 380,
        width: '100%',
        type: 'line'
      },
      stroke: {
        width: [0, 3]
      },
      title: {
        text: 'Daily order'
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: [
        '01 Jan 2021',
        '02 Jan 2021',
        '03 Jan 2021',
        '04 Jan 2021',
        '05 Jan 2021',
        '06 Jan 2021',
        '07 Jan 2021',
        '08 Jan 2021',
        '09 Jan 2021',
        '10 Jan 2021',
        '11 Jan 2021',
        '13 Jan 2021',
        '14 Jan 2021',
        '15 Jan 2021',
        '17 Jan 2021',
        '18 Jan 2021',
        '19 Jan 2021',
        '20 Jan 2021',
        '21 Jan 2021',
        '22 Jan 2021',
        '23 Jan 2021',
        '24 Jan 2021',
        '25 Jan 2021',
        '26 Jan 2021',
        '27 Jan 2021',
        '28 Jan 2021',
        '29 Jan 2021',
        '30 Jan 2021',
      ],
      xaxis: {
        type: 'datetime'
      },
      yaxis: [
        {
          title: {
            text: 'Sale'
          }
        },
        // {
        //   opposite: true,
        //   title: {
        //     text: 'Profit'
        //   }
        // }
      ]
    };



    if (this.isBrowser) {
      const chart = new ApexCharts(document.querySelector('#chart'), options);
      chart.render();
    }
  }

}
