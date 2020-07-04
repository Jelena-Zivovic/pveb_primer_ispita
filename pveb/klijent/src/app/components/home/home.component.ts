import { DataService } from './../../services/data.service';
import { Goal } from './../../models/goal.model';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private goals: Goal[] = [];
  private goalsToShow: Goal[] = [];

  private subGoals: Subscription = null;
  private subGoal: Subscription = null;
  private subStep: Subscription[] = [];
  private info: Goal = {
    _id: "",
    naziv: "",
    opis: "",
    vaznost: 0,
    koraci: []
  };

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.subGoals = this.dataService.getGoals().subscribe(ret => {
      this.goals = ret;
      
    },
    (error) => {
      console.log(error);
    },
    () => {

      this.goals.forEach(element => {
        this.subStep.push(
          this.dataService.getStepsForGoal(element._id).subscribe(r => {
            element.koraci = r;
            element.koraci.sort((a, b) => {
              return a.redniBroj - b.redniBroj;
            });
          }, 
          err => console.error(err),
          () => {
            this.goals.sort((a, b) => {
              return a.vaznost - b.vaznost;
            });
            this.goalsToShow = this.goals;
          })
        );
      });


      
      
    });


  }

  getGoals() {
    return this.goalsToShow;
  }

  getInfo() {
    return this.info;
  }

  showInfo(id: string) {
    
    this.subGoal = this.dataService.getGoalById(id).subscribe(ret => {
      this.info = ret[0];
    },
    error => {
      console.error(error);
    },
    () => {
      document.getElementById(id).style.display = 'block';
    });
    
  }

  filterByImportance(event) {
    let value = event.target.value;

    switch(value) {
      case "maloVazan": {

        this.goalsToShow = [];

        this.goals.forEach(element => {
          if (element.vaznost === 3) {
            this.goalsToShow.push(element);
          }
        });

        break;
      }
      case "umerenoVazan":{

        this.goalsToShow = [];

        this.goals.forEach(element => {
          if (element.vaznost === 2) {
            this.goalsToShow.push(element);
          }
        });

        break;
      }
      case "vazan": {

        this.goalsToShow = [];

        this.goals.forEach(element => {
          if (element.vaznost === 1) {
            this.goalsToShow.push(element);
          }
        });

        break;
      } 
      case "all": {

        this.goalsToShow = this.goals;

        break;
      }
    }

  }

  filterByComplexity(event) {
    let value = event.target.value;

    switch(value) {
      case "jednostavan": {

        this.goalsToShow = [];

        this.goals.forEach(element => {
          if (element.koraci.length === 1) {
            this.goalsToShow.push(element);
          }
        });

        break;
      }
      case "umerenoTezak": {
        this.goalsToShow = [];

        this.goals.forEach(element => {
          if (element.koraci.length === 2 || element.koraci.length === 3) {
            this.goalsToShow.push(element);
          }
        });
        break;
      } 
      case "tezak": {

        this.goalsToShow = [];

        this.goals.forEach(element => {
          if (element.koraci.length > 3) {
            this.goalsToShow.push(element);
          }
        });

        break;
      } case "all": {
        this.goalsToShow = this.goals;
        break;
      }
    }

  }

  ngOnDestroy() {
    this.subGoals.unsubscribe();
    if (this.subGoal) {
      this.subGoal.unsubscribe();
    }

    this.subStep.forEach(element => {
      element.unsubscribe();
    });
  }

}
