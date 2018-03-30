import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController, App, ModalController, Events } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { Ng2Cable } from "ng2-cable";
import { Http } from '@angular/http';

import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
	providers:[DatePipe]
})
export class HomePage {

	subSettings: string = 'home';

  constructor(public navCtrl: NavController) {

  }

}
