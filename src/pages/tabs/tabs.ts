import { Component } from '@angular/core';

// import { ChanelPage } from '../about/about';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  // tab2Root = ChanelPage;

  constructor() {

  }
}
