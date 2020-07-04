import { Step } from './../models/step.model';
import { Goal } from './../models/goal.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getGoals() : Observable<Goal[]> {
    return this.http.get<Goal[]>('http://localhost:3000/goals');
  }

  getGoalById(id: string) : Observable<Goal> {
    return this.http.get<Goal>('http://localhost:3000/goals/' + id);
  }

  getStepsForGoal(id: string) : Observable<Step[]> {
    return this.http.get<Step[]>('http://localhost:3000/steps/' + id);
  }

  addGoal(goal) {
    return this.http.post('http://localhost:3000/goals', goal);
  }

  addStep(step) {
    return this.http.post('http://localhost:3000/steps', step);
  }

  

}
