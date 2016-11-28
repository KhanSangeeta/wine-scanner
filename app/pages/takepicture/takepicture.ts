import {Page} from 'ionic-angular';
import {Component, ViewChild, Input, Output, EventEmitter} from '@angular/core';
import {NavController, NavParams, ionicBootstrap, ModalController, LoadingController, ToastController,PopoverController, ViewController, MenuController, AlertController} from 'ionic-angular';
import {Camera} from 'ionic-native';

@Page({
  templateUrl: 'build/pages/takepicture/takepicture.html'
})
export class TakePicture {
  public base64Image: string;

  constructor() {  }

  takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }
}