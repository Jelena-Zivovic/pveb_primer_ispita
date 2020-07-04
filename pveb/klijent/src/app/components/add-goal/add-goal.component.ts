import { Goal } from './../../models/goal.model';
import { Subscription } from 'rxjs';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.css']
})
export class AddGoalComponent implements OnInit {

  form = new FormGroup({
    naziv: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    opis: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
    vaznost: new FormControl('', [Validators.required]),
    korak1: new FormControl('', [Validators.required]),
    korak2: new FormControl(),
    korak3: new FormControl(),
    korak4: new FormControl(),
    korak5: new FormControl()
  });

  private saveGoalSub: Subscription = null;
  private stepSubs: Subscription[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
  }

  save(data) {

    if (this.form.valid) {
      let newGoal = {
        naziv: data.naziv,
        opis: data.opis,
        vaznost: data.vaznost as number
      };

      this.saveGoalSub = this.dataService.addGoal(newGoal)
        .subscribe(ret => {
          if (ret) {
            let koraci = [];
            koraci.push({
              cilj: (ret as Goal)._id,
              redniBroj: 1,
              opis: data.korak1
            });
            
            if (data.korak2) {
              koraci.push({
                cilj: (ret as Goal)._id,
                redniBroj: 2,
                opis: data.korak2
              });
            }

            if (data.korak3) {
              koraci.push({
                cilj: (ret as Goal)._id,
                redniBroj: 3,
                opis: data.korak3
              });
            }

            if (data.korak4) {
              koraci.push({
                cilj: (ret as Goal)._id,
                redniBroj: 4,
                opis: data.korak4
              });
            }

            if (data.korak5) {
              koraci.push({
                cilj: (ret as Goal)._id,
                redniBroj: 5,
                opis: data.korak5
              });
            }

            koraci.forEach(korak => {
              this.stepSubs.push(
                this.dataService.addStep(korak)
                  .subscribe(r => {
                    console.log(r);
                  }
              )
            )
            });

          }
          
        }
          
      
        );
      }
      else {
        let content = ""
        if (this.form.get('naziv').invalid) {
          content += "Uneti naziv nije validan.\n"
        }
        else if (this.form.get('opis').invalid) {
          content += "Uneti opis nije validan.\n"
        }
        else if(this.form.get('vaznost').invalid) {
          content += "Morate uneti vaznost.\n"
        }
        else if (this.form.get('korak1').invalid) {
          content += "Morate uneti bar jedan korak."
        }

        document.getElementById("greska").textContent = content;
        document.getElementById("greska").style.display = "block";
      }

  } 

  ngOnDestroy() {
    if (this.saveGoalSub) {
      this.saveGoalSub.unsubscribe();
    }

    this.stepSubs.forEach(element => {
      element.unsubscribe();
    });
  }


}
