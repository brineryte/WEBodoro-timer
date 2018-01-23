import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/takeWhile';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  pomodoro_max = 25; // in minutes
  break_max = 5; // in minutes
  final_break = 15;

  count = 4;
  completed = 0;

  current = 0;
  is_break = false;

  subscription;
  is_paused = false;

  pomodoro_progress = [ false, false, false, false ];

  start() {
    this.is_paused = false;
    const interval = Observable.interval(1000);

    this.subscription = interval
      .takeWhile( _ => !this.isFinished )
      .do(i => this.current += 1)
      .subscribe();
  }

  pause() {
    this.is_paused = true;
    this.subscription.unsubscribe();
  }

  startPomodoro() {
    this.is_break = false;
    this.start();
  }

  startBreak() {
    this.is_break = true;
    this.start();
  }

  finish() {
    this.is_paused = false;
    this.current = this.maxVal;
  }

  reset() {
    this.current = 0;
  }

  get isBreak() {
    return this.is_break;
  }

  get maxVal() {
    if (this.isBreak) {
      return isNaN(this.break_max) || this.break_max < 0.1 ? 0.1 : this.break_max * 60;
    } else {
      return isNaN(this.pomodoro_max) || this.pomodoro_max < 0.1 ? 0.1 : this.pomodoro_max * 60;
    }
  }

  get currentVal() {
    return isNaN(this.current) || this.current < 0 ? 0 : this.current;
  }

  get minutes() {
    if (this.maxVal >= 60) {
      return Math.floor(( this.maxVal - this.currentVal ) / 60) < 10
                              ? '0' + Math.floor(( this.maxVal - this.currentVal ) / 60)
                              : Math.floor(( this.maxVal - this.currentVal ) / 60);
    } else {
      return '00';
    }
  }

  get seconds() {
    if (this.maxVal >= 1) {
      return Math.floor(( this.maxVal - this.currentVal ) % 60) < 10
                              ? '0' + Math.floor(( this.maxVal - this.currentVal ) % 60)
                              : Math.floor(( this.maxVal - this.currentVal ) % 60);
    } else {
      return '00';
    }
  }

  get isFinished() {
    return this.currentVal >= this.maxVal;
  }
}
