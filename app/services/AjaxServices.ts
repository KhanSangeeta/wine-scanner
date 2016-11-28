/*import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppConstants} from './AppConstants';
declare var ape_config;

export class AjaxServices {
  private authentication = AppConstants.API.authenticate;
  private allPosts = AppConstants.API.posts; // "https://api.myjson.com/bins/3tugt";
  private addPostContentUrl = AppConstants.API.posts ; // "https://api.myjson.com/bins/3tugt";
  private updatePostContentUrl = AppConstants.API.posts;
  private getPostContentUrl = AppConstants.API.posts;
  private allBrands = AppConstants.API.brandLists;
  private uploadFeaturedImageUrl = AppConstants.API.uploadFeaturedImageUrl + '?access_token=' + window.localStorage.getItem('ape-cp-token');
  private oauthApiKey = ape_config.oauth_API_key;
  private oauthApiSecret = ape_config.oauth_API_secret;
  static get parameters() {
    return [[Http]];
  }

  constructor(private http: Http) {

  }

  authenticate(data) {
    data['grant_type'] = 'password';
    var authHeader = new Headers();
    authHeader.append('Authorization', 'Basic ' + btoa(this.oauthApiKey+':'+this.oauthApiSecret));
    authHeader.append('Content-Type', 'application/json');
    authHeader.append('Accept', 'application/json');
    var response = this.http.post(this.authentication, data, { headers: authHeader }).map(res => res.json());
    return response;
  }

  getAllPosts(page,blogId) {
      if(blogId) {
         return this.http.get(this.allPosts + blogId + '/posts' +'?page=' + page).map(res => res.json());
     }else{
         return this.http.get(this.allPosts + 'posts' + '?page=' + page).map(res => res.json());
     }
  }
 
  getAllBrands(){
      return this.http.get(this.allBrands).map(res => res.json());
  }

  getPostByKey(key) {
    return this.http.get(this.getPostContentUrl + '/' + key).map(res => res.json());
  }

  addPost(blogId,data) {
   if(blogId){
        return this.http.put(this.updatePostContentUrl + blogId + '/posts' + key, data).map(res => res.json());
    }else{
        return this.http.put(this.updatePostContentUrl + blogId + 'posts' + key, data).map(res => res.json());
    }
  }

  updatePostByKey(key,blogId,data) {
    if(blogId){
        return this.http.put(this.updatePostContentUrl + blogId + '/posts' + key, data).map(res => res.json());
    }else{
        return this.http.put(this.updatePostContentUrl + blogId + 'posts' + key, data).map(res => res.json());
    }
    
  }

  uploadFeatuedImage(files: Array<File>) {
    return new Promise((resolve, reject) => {
      var formData: any = new FormData();
      var xhr = new XMLHttpRequest();
      formData.append('file', files[0], files[0].name);

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200 || xhr.status === 201) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', this.uploadFeaturedImageUrl, true);
      // xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      xhr.send(formData);
    });
  }
}
*/