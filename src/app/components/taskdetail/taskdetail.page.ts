import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Task } from '../../statemanagement/models/Task';
import { TaskAdd, TaskEdit } from '../../statemanagement/actions/task.action';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';


@Component({
  selector: 'app-taskdetail',
  templateUrl: './taskdetail.page.html',
  styleUrls: ['./taskdetail.page.scss'],
})
export class TaskdetailPage implements OnInit {
  tasks: Task[]
  curretntask = new Task
  nIndex: -1
  constructor(private store: Store<{ tasks: Task[] }>, private route: ActivatedRoute, public navCtrl: NavController, public alertCtrl: AlertController) {
    store.pipe(select("tasks")).subscribe(values => {
      this.tasks = values;
    });
    this.route.queryParams.subscribe(params => {
      this.nIndex = params["INDEX"];
      if (this.nIndex >= 0) {
        this.curretntask = { ...this.tasks[this.nIndex] };
        console.log(this.curretntask);
      }
    });
  }

  ngOnInit() {
  }

  onSaveTask() {
    if (this.curretntask.title == "") {
      this.showAlert("Please fill task title");
      return;
    }
    if (this.nIndex == -1) {
      this.store.dispatch(new TaskAdd(this.curretntask))
    } else {
      this.store.dispatch(new TaskEdit({ index: this.nIndex, data: this.curretntask }))
    }
    this.navCtrl.navigateBack("/");
  }

  onIncrease() {
    this.curretntask.duration++;
  }
  onDecrease() {
    this.curretntask.duration -= 1
    if (this.curretntask.duration < 0)
      this.curretntask.duration = 0;
  }

  async showAlert(msg) {
    const alert = await this.alertCtrl.create({
      message: msg,
      buttons: [
        {
          text: 'Ok',
          role: 'cancel',
        }
      ]
    });
    await alert.present();
  }
}
