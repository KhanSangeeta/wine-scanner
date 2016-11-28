
import {LoadingController} from 'ionic-angular';
import * as moment from 'moment';

export class SharedServices{
  public loading: any;
  constructor( public loadingController: LoadingController){
      
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


}