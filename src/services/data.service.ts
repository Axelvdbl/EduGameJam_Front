import {Injectable} from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

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

	private baseURL = 'https://prod-gj.herokuapp.com/api/v1/';
	// private baseURL = 'http://localhost:3000/api/v1/';

	/* Questions */

	getQuestions() {
		let options = new RequestOptions({ headers: this.headers });
		return this.http.get(this.baseURL + 'messages', options)
									.map(this.extractData)
									.catch(this.handleError);
	}

	postQuestion(message, percent) {
		let body = JSON.stringify({ title: message.title, percent: percent });
		let options = new RequestOptions({ headers: this.headers });
		return this.http.post(this.baseURL + 'messages', body, options)
										.map(this.extractData)
										.catch(this.handleError);
	}

	/* Channel */

	postChannel(channel) {
		let body = JSON.stringify({ channel });
		let options = new RequestOptions({ headers: this.headers });
		return this.http.post(this.baseURL + 'channels', body, options)
										.map(this.extractData)
										.catch(this.handleError);
	}

	putChannel(channel) {
	let body = JSON.stringify({ channel })
	console.log(channel);
	let options = new RequestOptions({ headers: this.headers });
	return this.http.put(this.baseURL + 'channels/' + channel.id, body, options)
									.map(this.extractData)
									.catch(this.handleError);
}

	/*Students*/

	getStudents(channel_id) {
		let options = new RequestOptions({ headers: this.headers });
		return this.http.get(this.baseURL + 'students?channels_id=' + channel_id, options)
									.map(this.extractData)
									.catch(this.handleError);
	}

	/*Favorites*/

	getFavorites() {
		let id = localStorage.getItem('user_id');
		let options = new RequestOptions({ headers: this.headers });
		return this.http.get(this.baseURL + 'favorites?teacher_id=' + id, options)
									.map(this.extractData)
									.catch(this.handleError);
	}

	getOneFavorite(message_id, teacher_id) {
		let options = new RequestOptions({ headers: this.headers });
		return this.http.get(this.baseURL + 'favorites?teacher_id=' + teacher_id + "&message_id=" + message_id, options)
									.map(this.extractData)
									.catch(this.handleError);
	}

	postFavorite(user, question) {
		console.log(question);
		let body = JSON.stringify({ teacher_id: user, message_id: question });
		console.log(body);
		let options = new RequestOptions({ headers: this.headers });
		return this.http.post(this.baseURL + 'favorites', body, options)
										.map(this.extractData)
										.catch(this.handleError);
	}

	deleteFavorite(id) {
		console.log(id);
		let options = new RequestOptions({ headers: this.headers });
		return this.http.delete(this.baseURL + 'favorites/' + id, options)
									.map(this.extractData)
									.catch(this.handleError);
	}

	/* Handle response */

	private extractData(res: Response) {
		let headers = res.headers
		let body = res.json();
		return {body: body, headers: headers} || { };
	}

	private handleError (error: any) {
		// In a real world app, we might use a remote logging infrastructure
		// We'd also dig deeper into the error to get a better message
		let errMsg = (error.message) ? error.message :
		error._body ? `${error._body}` : 'Server error';
		return Observable.throw(errMsg);
	}

}
