import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { AuthService } from '../services/auth.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

	rootPage: any;

  constructor(platform: Platform,  public auth: AuthService, private statusBar: StatusBar, private splashScreen: SplashScreen) {
    platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.auth.validateToken()
               .subscribe(
                  data => {
                    if(data.body.success == true){
                       this.rootPage = HomePage;
                    }else{
                      this.rootPage = LoginPage;
                    }
                    this.splashScreen.hide();
                  },
                  error => {
                    this.rootPage = LoginPage;
                    this.splashScreen.hide();
                  }
                )
    });
  }

}
