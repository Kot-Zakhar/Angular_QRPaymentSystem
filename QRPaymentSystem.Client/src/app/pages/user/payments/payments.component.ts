import { Component, OnInit } from '@angular/core';
import { debug } from 'debug';
import { routes } from 'src/environments/environment';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {
  private log = debug('app-transaction-creator');

  paymentGroups = [
    {
      name: 'New transfer',
      group: [
        {
          name: 'To own asset',
          link: '',
          icon: 'swap_vertical_circle'
        },
        {
          name: 'By asset number',
          link: '',
          icon: 'credit_card'
        },
        {
          name: 'Transfer request',
          link: '',
          icon: 'assignment'
        }
      ]
    },
    {
      name: 'History',
      group: [
        {
          name: 'Completed transactions',
          link: '',
          icon: 'history'
        }
      ]
    },
    {
      name: 'QR',
      group: [
        {
          name: 'Scan',
          link: routes.scan,
          icon: 'border_clear'
        },
        {
          name: 'Saved codes',
          link: '',
          icon: 'save'
        }
      ]
    }
  ]
  constructor(
  ) { }

  ngOnInit() {
  }

}
