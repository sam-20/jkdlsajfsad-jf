import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class PostProvider {
    // server : string ="http://www.camfilaknust.com/" //api url
    server: string = "http://10.149.152.59:8080/camfilaapi/" //api url
    // server : string ="http://10.162.90.177/camfilaapi/" //api url
    //server : string = "http://camfilaknust.tk/"

    constructor(public http: Http) {
    }

    postData(body, file) {
        let type = "text/plain; charset=UTF-8";
        let headers = new Headers({ 'Content-Type': type });
        let options = new RequestOptions({ headers: headers });

        return this.http.post(this.server + file, JSON.stringify(body), options)
            .map(res => res.text()); //.text because type = "text/plain"
    }
}