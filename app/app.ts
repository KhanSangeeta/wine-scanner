import {Component,ViewChild,provide,enableProdMode} from '@angular/core';
import {Platform, ionicBootstrap,Nav,NavController,App,ToastController, AlertController } from 'ionic-angular';
import {StatusBar,Splashscreen,Network} from 'ionic-native';
import {HTTP_PROVIDERS, Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers} from '@angular/http';
import {WineEvent} from './pages/wineEvents/wineEvents';
import {TakePicture} from './pages/takepicture/takepicture';
import  {HttpInterceptor} from './services/HttpInterceptor';

declare var UAirship;

declare var navigator: any;
declare var Connection: any;


@Component({
  templateUrl: 'build/app.html',
})
export class CPMobileApp {
@ViewChild(Nav) nav: Nav;
  credentialsMsg : any;
  rootPage: any ;
  pages: Array<{title: string, component: any,icon :any}>;
  

  constructor(platform: Platform,public toastCtrl: ToastController,public alertCtrl: AlertController){
    this.pages = [
      { title: 'Wine Events', component: WineEvent, icon : 'beer' },
      { title: 'Wine Scanner', component: TakePicture , icon :'camera'},
    ];
    this.rootPage = TakePicture;
  }

   

  openPage(page) {
    if(this.nav.getActive().name == page.component.name) {
      return;
    }
  	if(page.component.name == "WineEvent") {
  		this.nav.push(page.component);
  	} else {
  		this.nav.setRoot(page.component);
  	}
  } 
}
enableProdMode();
ionicBootstrap(CPMobileApp,[provide(Http, {
      useFactory: (xhrBackend: XHRBackend,toastCtrl:ToastController, requestOptions: RequestOptions,app:App) => new HttpInterceptor(xhrBackend,toastCtrl, requestOptions,app),
      deps: [XHRBackend, ToastController,RequestOptions, App]
    })],{
      backButtonText: ''
    }
);
