import { DataService } from './services/data.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImportanceDirective } from './directives/importance.directive';
import { GoalInfoComponent } from './components/home/goal-info/goal-info.component';
import { AddGoalComponent } from './components/add-goal/add-goal.component';
 

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ImportanceDirective,
    GoalInfoComponent,
    AddGoalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
