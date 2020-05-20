import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store, select } from "@ngrx/store";
import { Task } from '../../statemanagement/models/Task';
import { TaskRemove } from '../../statemanagement/actions/task.action';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
})
export class TasklistPage implements OnInit {
  tasks: Task[];

  result: object = {
    totalCost: 0,
    totalProfit: 0,
    subtotal: 0,
    vat: 0,
    total: 0,
  }

  DurationUnits = {
    "day": "Days",
    "hour": "Hours"
  }

  constructor(private store: Store<{ tasks: Task[] }>, public navCtrl: NavController) {
    store.pipe(select("tasks")).subscribe(values => {
      this.tasks = values;
      //Calculate Bottom Total Board
      this.result = this.tasks.reduce((acc, cur) => ({
        totalCost: acc.totalCost + cur.cost,
        totalProfit: acc.totalProfit + cur.price,
        subtotal: acc.subtotal + cur.price + cur.cost,
        vat: acc.vat + (cur.price + cur.cost) * parseFloat(cur.rate) / 100,
        total: acc.total + cur.total,
      }), {
        totalCost: 0,
        totalProfit: 0,
        subtotal: 0,
        vat: 0,
        total: 0,
      })
    });
  }

  ngOnInit() {
  }

  //When task is clicked, go to Edit page.
  onEditTask(index) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        INDEX: index
      }
    };
    this.navCtrl.navigateForward(['/taskdetail'], navigationExtras);
  }
  //When trash is clickd, remove item from array
  onRemoveTask(event, index) {
    event.stopPropagation();
    this.store.dispatch(new TaskRemove(index));
  }

  //When floating + button is clicked, go to Edit Page with index -1 (New)
  onNewTask() {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        INDEX: -1
      }
    };
    this.navCtrl.navigateForward(['/taskdetail'], navigationExtras);
  }
}
