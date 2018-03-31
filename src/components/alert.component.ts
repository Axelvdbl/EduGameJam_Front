import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';

@Component({
  template: '',
})
export class AlertComponent {

  constructor(private alertCtrl: AlertController) {  }

  public presentConfirm(title): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const confirm = this.alertCtrl.create({
        title: title,
        buttons: [{
          text: 'Annuler',
          role: 'cancel',
          handler: () => resolve(false)
        },
        {
          text: 'Supprimer',
          handler: () => resolve(true)
        }]
      }).present();
    })
  }

}
