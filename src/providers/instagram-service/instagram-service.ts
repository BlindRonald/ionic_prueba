import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AlertController } from "ionic-angular";
import 'rxjs/add/operator/map';


@Injectable()
export class InstagramServiceProvider {

	instagram:string = "";
	username:string = "";
	profile_picture: string = "";
	nombre:string = "";
	bio:string = "";

	constructor(public http: Http,
				public alertCtrl: AlertController,
				public storage: Storage) {
		//console.log('Hello InstagramServiceProvider Provider');
		//this.cargar_storage();
	}

	obtener_datos(token) {
		return this.http.get('https://api.instagram.com/v1/users/self/?access_token=' + token)
					.map((res) =>{
						let resp = res.json();
						this.username = resp.data.username;
						this.profile_picture = resp.data.profile_picture;
						this.nombre = resp.data.full_name;
						this.bio = resp.data.bio;
						//console.log('resp: '+resp.data.username);
						//console.log('resp: '+JSON.stringify(resp));
//"data":{"id":"2278901567","username":"rjl_luna","profile_picture":"https://scontent.cdninstagram.com/vp/8cd09dbd8dd8bbb451eeec3f0b74089f/5C205835/t51.2885-19/s150x150/25018238_2037493886469146_7429274479743729664_n.jpg","full_name":"Ronald Luna","bio":"Printf('hello world');","website":"","is_business":false,"counts":{"media":150,"follows":248,"followed_by":172}},"meta":{"code":200}}
					});
	}

	cargar_storage(){
		let promesa = new Promise( (resolve, reject) =>{

			//if (this.platform.is("cordova")) {
				//dispositivo
				this.storage.ready()
						.then( ()=>{

							this.storage.get("instagram")
								.then( instagram =>{
									if (instagram) {
		  								this.instagram = instagram;
		  							}
								})

		            		resolve();
						})
							
			//}
	});

	return promesa;
	}

	showAlert(message) {
		let alert = this.alertCtrl.create({
			message: message,
			buttons: ['OK']
		});
		alert.present();
	}

}
