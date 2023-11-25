import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-no-content',
  templateUrl: './no-content.component.html',
  styleUrls: ['./no-content.component.scss']
})
export class NoContentComponent implements OnInit {

  @Input() matIcon: string = 'loyalty';
  @Input() title: string = 'No Task Added Yet!';
  @Input() desc: string = 'Please add your task for proper maintain your work schedule.';

  constructor() { }

  ngOnInit(): void {
  }

}
