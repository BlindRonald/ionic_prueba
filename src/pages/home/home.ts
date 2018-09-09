import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

import { Storage } from "@ionic/storage";
//import { Instagram } from '@ionic-native/instagram';
import { SocialSharing } from '@ionic-native/social-sharing';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

//Providers
import { InstagramServiceProvider } from '../../providers/instagram-service/instagram-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	currentImage: string;
	instagram: string="";
	username:string = "";
	profile_picture: string = "";
	nombre:string = "";
	bio:string = "";
	mensaje:string = "";

	constructor(public navCtrl: NavController,
				private storage: Storage,
				public http: Http,
				public domSanitizer: DomSanitizer,
				public instaService: InstagramServiceProvider,
				private socialSharing: SocialSharing,
				//private insta: Instagram,
				private camera: Camera) {

	}

	ionViewDidLoad() {
		this.currentImage = "assets/imgs/picture.png";
		this.getUserProfile();
		/*this.cargar_storage().then(()=>{
			console.log('abc: '+this.instagram);
		})*/
	}

	Cargar_Img() {
		let options: CameraOptions = {
			quality: 100,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY      
		}

		this.camera.getPicture(options).then(data => {
			this.currentImage = 'data:image/jpeg;base64,' + data;
		}, err => {
			// Handle error
			console.log(err)
		});
	}

	Compartir_img() {
		this.socialSharing.shareViaInstagram(this.mensaje, this.currentImage).then(() => {
		  console.error('success');
		})
		.catch(err => {
		  // Handle error
		  console.error(err);      
		})
		/*this.insta.share(this.currentImage, 'Copiado!')
		.then(() => {
		  // Image might have been shared but you can't be 100% sure
		})
		.catch(err => {
		  // Handle error
		  console.error(err);      
		})*/
	}

	getUserProfile() {
		this.cargar_storage().then(()=>{
			this.instaService.obtener_datos(this.instagram)
						    .subscribe(()=> {
						    	this.username = this.instaService.username;
								this.profile_picture = this.instaService.profile_picture;
								this.nombre = this.instaService.nombre;
								this.bio = this.instaService.bio;
								//console.log('datos: '+this.username);
							});
		})
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
		  								resolve();
		  							}
								})
						})
							
			//}
	});

	return promesa;
	}


}
