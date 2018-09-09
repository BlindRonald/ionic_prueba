import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController } from "ionic-angular";

//Pages
import { HomePage } from '../home/home';
import { InstagramServiceProvider } from '../../providers/instagram-service/instagram-service';

//Plugins
import { Instagram } from "ng2-cordova-oauth/core";  
import { OauthCordova } from "ng2-cordova-oauth/platform/cordova";
import { Storage } from "@ionic/storage";
import { InAppBrowser } from "@ionic-native/in-app-browser";

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	private oauth: OauthCordova = new OauthCordova();
	private instagramProvider: Instagram = new Instagram({
		clientId: "80cd40af9b3a4e3e9c300224b65f2f9d",      // Register you client id from https://www.instagram.com/developer/
		redirectUri: 'http://localhost',  // Let is be localhost for Mobile Apps
		responseType: 'token',   // Use token only 
		appScope: ['basic','public_content']
	});

	instagram:string = "";

	constructor(public navCtrl: NavController,
				public storage: Storage,
				public alertCtrl: AlertController,
				private iab: InAppBrowser,
				public instaService: InstagramServiceProvider,
				public navParams: NavParams) {
	}

	ionViewDidLoad() {
		//console.log('ionViewDidLoad LoginPage');
	}

	login() {
		this.oauth.logInVia(this.instagramProvider) 
			.then((success) => {

				this.instagram = success['access_token'];
				//console.log(this.instagram);

				this.storage.set('instagram', this.instagram);
				
				this.navCtrl.setRoot(HomePage, {
					response: success['access_token']
				}).catch((err) => {
					this.showAlert('Error origen: ' + err);
				});

		}).catch((err) => {
			this.showAlert('Error: ' + err);
		});
	}

	showAlert(message) {
		let alert = this.alertCtrl.create({
			message: message,
			buttons: ['OK']
		});
		alert.present();
	}

}
