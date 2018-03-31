import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

import { Student } from './students/student'
@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html'
})
export class ChannelPage {

	subSettings: string = 'students';

	channels = {
		id: null,
		name: '',
		is_active: false
	}
	name: string;
	id: string;

	students: Student[];

  constructor(public navCtrl: NavController,
							private data: DataService,
							private loadingCtrl: LoadingController,
							private navParams: NavParams) {
			this.channels.name = navParams.get('name');
			this.channels.id = navParams.get('id');
			this.getStudents();
		}

	start() {
		let loader = this.loadingCtrl.create({
			content: "Lancement de la partie"
		});
		loader.present();
		this.channels.is_active = true;
		this.data.putChannel(this.channels)
							.subscribe(
								data => {
									loader.dismissAll();
								},
								error => {
									console.log(error)
									loader.dismissAll();
								}
							)
	}

	getStudents() {
		let loader = this.loadingCtrl.create({
			content: "Veuillez patienter ..."
		});
		loader.present();
		this.data.getStudents(this.channels.id)
							.subscribe(
								data => {
									this.students = data.body
									console.log(data.body);
									loader.dismissAll();
								},
								error => {
									console.log(error)
									loader.dismissAll();
								}
							)
	}

	refresh() {
		this.getStudents();
	}

}
