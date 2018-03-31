import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html'
})
export class ChannelPage {

	subSettings: string = 'students';

	channels = {
		id: null,
		name: '',
		isActive: false
	}
	name: string;
	id: string;

	students = {
		id: null,
		firstname: '',
		lastname: '',
	};

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
		this.channels.isActive = true;
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
									this.students = data.body;
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
