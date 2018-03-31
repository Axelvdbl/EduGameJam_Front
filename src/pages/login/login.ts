import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { ChannelPage } from '../channel/channel';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  email:string = '';
  password:string = '';

  constructor(private auth: AuthService, public navCtrl: NavController, public alertCtrl: AlertController, public loadingCtrl:LoadingController) {
		this.navCtrl.setRoot(ChannelPage);
	}

  login() {
      let loader = this.loadingCtrl.create({
        content: "Veuillez patienter ..."
      });
      loader.present();

      this.auth.login(this.email, this.password)
               .subscribe(
                          data => {
                            if (data) {
                              localStorage.setItem('access_token', data.headers.get('access-token'));
                              localStorage.setItem('client', data.headers.get('client'));
                              localStorage.setItem('uid', data.headers.get('uid'));
                              localStorage.setItem('expiry',  data.headers.get('expiry'));
                              localStorage.setItem('token-type',  data.headers.get('token-type'));
                              localStorage.setItem('user_id',  data.body.data.id);
                              loader.dismissAll();
                              this.navCtrl.setRoot(HomePage);
                            }
                          },
                          (err) => {
                            loader.dismissAll();
                            let errors = '';
                            if(err.message === 'UNPROCESSABLE ENTITY') errors += 'Email isn\'t valid.<br/>';
                            if(err.message === 'UNAUTHORIZED') errors += 'Password is required.<br/>';

                            let alert = this.alertCtrl.create({
                              title: "Erreur d'authentification",
                              subTitle: errors,
                              buttons:['OK']
                            });
                            alert.present();
                          });
        }

  // resetPassword(){
  //   this.navCtrl.push(ResetPasswordPage);
  // }
}
