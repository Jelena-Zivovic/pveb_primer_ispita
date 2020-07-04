import { Goal } from './../../../models/goal.model';
import { DataService } from './../../../services/data.service';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-goal-info',
  templateUrl: './goal-info.component.html',
  styleUrls: ['./goal-info.component.css']
})
export class GoalInfoComponent implements OnInit {

  @Input() goalId: {id: string, show: boolean};
  private subInfo : Subscription = null;
  private infoToShow : Goal;

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    
  }

 

  ngOnDestroy() {
  }

}
