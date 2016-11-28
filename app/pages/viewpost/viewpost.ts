import {Component} from '@angular/core';
import {NavController, ViewController, NavParams, MenuController,LoadingController} from 'ionic-angular';
import {CreatePost} from '../createpost/createpost';
import {AjaxServices} from '../../services/AjaxServices';
import {TimeAgoPipe} from 'angular2-moment';
import * as moment from 'moment';
import {AppConstants} from '../../services/AppConstants';
//import { SharedServices } from '../../services/SharedServices';
import 'rxjs/Rx';

@Component({
  templateUrl: 'build/pages/viewpost/viewpost.html',
  pipes: [TimeAgoPipe],
  providers: [AjaxServices]
})
export class ViewPost {
  post = {};
  postKey: { post_id?: number } = {};
  private loading: any;
  private statusMap = AppConstants.statusMap;

  constructor(private navParams: NavParams, private navCtrl: NavController,private ajaxService: AjaxServices, private menu: MenuController,public loadingController: LoadingController) {
   this.postKey = navParams.get('postKey');
   this.ajaxService = ajaxService;
  }
 presentLoading() {
    this.loading= this.loadingController.create({
      content: "Please wait..."
    });
    this.loading.present();
  }
  convertUTCToLocalTime(time) {  
    var localTime  = moment.utc(time).toDate();
       return moment(localTime).format('YYYY-MM-DD HH:mm:ss');
  }
  

  editPost(post) {
    if(post.post_status !== 'publish'){
        this.navCtrl.push(CreatePost, { 'postKey': post });
    }    
  }

  ionViewDidEnter() {
    this.presentLoading();   
    this.ajaxService.getPostByKey(this.postKey.post_id).subscribe(
    data => {
       this.post = data;
           this.loading.dismiss();
     },
     err => {
       console.log(err);
       this.loading.dismiss();
     }
   );
  }

  ionViewWillLeave() {
   
  }
  
   ionViewLoaded() {
    this.menu.enable(false);
    
  }

  ionViewDidUnload() {
    this.menu.enable(true);
  }
}
