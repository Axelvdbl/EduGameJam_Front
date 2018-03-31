import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'page-channel',
  templateUrl: 'channel.html'
})
export class ChannelPage {

	subSettings: string = 'channel';

  constructor(public navCtrl: NavController) {

	}
}
