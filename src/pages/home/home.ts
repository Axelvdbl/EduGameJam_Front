import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController, App, ModalController, Events } from 'ionic-angular';
import { Ng2Cable } from "ng2-cable";
import { Http } from '@angular/http';

import { Channel } from './channels/channel';
import { Question } from './questions/question';
import { QuestionsPage } from './questions/questions';
import { ChannelPage } from '../channel/channel';
import { DataService } from '../../services/data.service';
import { AuthService } from '../../services/auth.service';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

	subSettings: string = 'home';

	channelActive: boolean = false;

	questions: Question[];

	channels = {
		id: null,
		name: '',
		teachers_id: localStorage.getItem('user_id'),
		isStart: false
	};

  constructor(public navCtrl: NavController,
							private auth: AuthService,
							private data: DataService,
							private loadingCtrl: LoadingController,
							private alertCtrl: AlertController,
							private modalCtrl: ModalController,
							private events: Events) {
		this.getQuestions();
  }

	getQuestions() {
		let loader = this.loadingCtrl.create({
			content: "Veuillez patienter ..."
		});
		loader.present();
		this.data.getQuestions()
							.subscribe(
								data => {
									this.questions = data.body;
									loader.dismissAll();
								},
								error => {
									console.log(error)
									loader.dismissAll();
								}
							)
	}

	CreateChannel() {
		this.channelActive = true;
	}

	postChannel() {
		let loader = this.loadingCtrl.create({
			content: "Veuillez patienter ..."
		});
		loader.present();
		this.data.postChannel(this.channels)
								.subscribe(
									data => {
										this.channels = data.body;
										console.log(this.channels);
										loader.dismissAll();
										this.navCtrl.push(ChannelPage, {name: this.channels.name, id: this.channels.id});
									},
									error => {
										console.log(error);
										loader.dismissAll();
									}
								)
	}

	presentQuestionModal() {
		let modal = this.modalCtrl.create(QuestionsPage, {});
		modal.onDidDismiss(data => {
			this.getQuestions();
		});
		modal.present();
	}

	logOut() {
		let loader = this.loadingCtrl.create({
			content: "Veuillez patienter ..."
		});
		loader.present();
		this.auth.logOut()
						 .subscribe(
							 success => {
								localStorage.clear();
								this.events.publish('reloadEvents');
								window.location.reload();
								loader.dismissAll();
							},
							error => {
								console.log(error)
								loader.dismissAll();
							}
						 )
	}

}
