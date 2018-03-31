import { Component } from '@angular/core';
import { NavParams, NavController, ViewController, ToastController, LoadingController, Events, AlertController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DataService } from '../../../services/data.service';
import { AlertComponent } from '../../../components/alert.component';

@Component({
  selector: 'page-questions',
  templateUrl: 'questions.html'
})

export class QuestionsPage {

	title: string;
	percent: boolean;
  private question : FormGroup;
  constructor(private loadingCtrl: LoadingController,
							private toastCtrl: ToastController,
							public viewCtrl: ViewController,
							public navCtrl: NavController,
							public params: NavParams,
							private formBuilder: FormBuilder,
							private data: DataService,
							private events: Events,
							private alert: AlertComponent,
							private alertCtrl: AlertController) {
  }

  ngOnInit(){
      this.question = this.formBuilder.group({
        title: ['', Validators.compose([Validators.required])]
      });
  }

  submit(){
		console.log(this.question.value);
    this.postQuestion();
  }

	setPercent(bool) {
		if (bool) {
			this.percent = true;
		} else {
			this.percent = false;
		}
	}

  postQuestion(){
    let loader = this.loadingCtrl.create({
      content: "Veuillez patienter ..."
    });
    loader.present();
    this.data.postQuestion(this.question.value)
                    .subscribe(
                      success => {
														this.navCtrl.pop();
														this.presentToast('Question créé avec succès')
														loader.dismissAll();
                    	},
                    	error => {
                        loader.dismissAll();
                      }
										)
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 10000,
      position: 'bottom',
      showCloseButton: true,
      closeButtonText: 'Fermer',
      dismissOnPageChange: true
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
