import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/timeout';


@Injectable()
export class DataService {

	constructor (private http: Http) {
		this.setHeaders();
	}

	headers: Headers;

	setHeaders() {
		this.headers = new Headers(
			{
				'Content-Type': 'application/json',
				'access_token':localStorage.getItem('access_token'),
				'client': localStorage.getItem('client'),
				'uid': localStorage.getItem('uid'),
				'expiry': localStorage.getItem('expiry'),
				'token-type': localStorage.getItem('token-type'),
			}
		);
	}

	private baseURL = 'http://localhost:3000/api/v1/';

	/* Products */

	// getProducts(user) {
	// 	let options = new RequestOptions({ headers: this.headers });
	// 	return this.http.get(this.baseURL + 'products?user_id=' + user, options)
	// 								.map(this.extractData)
	// 								.catch(this.handleError);
	// }

}
