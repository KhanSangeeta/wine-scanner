import {provide} from '@angular/core';
import {App, AlertController,ToastController} from 'ionic-angular';
import {HTTP_PROVIDERS, Http, Request, RequestOptionsArgs, Response, XHRBackend, RequestOptions, ConnectionBackend, Headers} from '@angular/http';
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';
import {TakePicture} from '../pages/takepicture/takepicture';

export class HttpInterceptor extends Http {

    static get parameters() {
        return [[App]];
    }
    sessionExpiredMsg:any;

    constructor(backend: ConnectionBackend, public toastCtrl: ToastController,defaultOptions: RequestOptions, private app: App) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        url = this.modifyURL(url);
        return this.intercept(super.request(url, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.modifyURL(url);
        return this.intercept(super.get(url, this.getRequestOptionArgs(options)));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.modifyURL(url);
        return this.intercept(super.post(url, body, this.getRequestOptionArgs(options)));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.modifyURL(url);
        return this.intercept(super.put(url, body, this.getRequestOptionArgs(options)));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.modifyURL(url);
        return this.intercept(super.delete(url, options));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        // options.headers.append('Authorization', 'Basic ' + btoa('XJ4JBImNFzWeYWr3x07BQJ5MhWqbaC:O7lSQXAcKgMGvLDXOaXVMNFRAXO08Y'));
        // options.headers.append('Content-Type', 'application/json');
        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        let me = this;
        return observable.catch((err, source) => {
            if (err.status === 403 && !this.isLoginURL(err.url, '?oauth=token')) {
              this.showSessionExpiredMsg()
                me.app.getActiveNav().setRoot(TakePicture);
                window.localStorage.clear();
                return Observable.empty();
            } else {
                return Observable.throw(err);
            }
        });
    }

    showSessionExpiredMsg(){
        this.sessionExpiredMsg = this.toastCtrl.create({
                message: 'Session Timeout ',
                showCloseButton: true,
                closeButtonText: 'Ok',
                duration: 3000
            });
        this.sessionExpiredMsg.present();
    }
    
    modifyURL(url) {
        if (this.isLoginURL(url, '?oauth=token')) {
            return url;
        } else {
            const appender = (url.indexOf('?') === -1) ? '?' : '&';
            return url + appender + 'access_token=' + window.localStorage.getItem('ape-cp-token');
        }

    }

    isLoginURL(url, suffix) {
        return url.indexOf(suffix, url.length - suffix.length) !== -1;
    }
}