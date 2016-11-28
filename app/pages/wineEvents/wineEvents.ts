import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {NavController, NavParams, ionicBootstrap, ModalController, LoadingController, ToastController,PopoverController, ViewController, MenuController, AlertController} from 'ionic-angular';


@Component({
  templateUrl: 'build/pages/wineEvents/wineEvents.html',
})

export class WineEvent{

  
  constructor(navParams: NavParams, public loadingController : LoadingController, private alertCtrl: AlertController,private toastCtrl: ToastController, private navCtrl: NavController, private modalController: ModalController, private menu: MenuController, private popoverCtrl: PopoverController) {
    
  }
}