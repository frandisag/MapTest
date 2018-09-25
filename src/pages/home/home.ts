import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions } from '@ionic-native/google-maps'
import { Geolocation } from '@ionic-native/geolocation'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	map: GoogleMap;
	mapElement: HTMLElement;
	watchId: any;
	latitude: any;
	longitude: any;

	zoom: any;
	tilt: any;
	bearing: any;

	bearingValue: any;
	tiltValue: any;
	zoomValue: any;

  constructor(
  	public navCtrl: NavController,
  	public geo: Geolocation) {
  	this.zoomValue = 18;
  	this.tiltValue = 60;
  	this.bearingValue = 140;
  }

  loadMap(){
  	try{
  		this.mapElement = document.getElementById('map');

  		let mapOption: GoogleMapOptions = {
  			camera: {
  				target: {
  					lat: -6.247543,
  					lng: 106.980251
  				},
  				zoom: 18,
  				tilt: 30
  			}
  		};

  		this.map = GoogleMaps.create(this.mapElement,mapOption);

  		this.map.on(GoogleMapsEvent.MAP_READY).then(
  			() => {
  				alert('Map is ready to use')
  				this.map.addMarker({
  					title : 'hi from me',
  					icon : 'blue',
  					animation : 'drop',
  					position : {
  						lat: -6.247543,
  						lng: 106.980251
  					}
  				}).then(marker=>{
  					marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(()=>{
  						alert('Hi There')
  					})
  				})
  			}
  		);
  	}catch(error){
  		alert("Map Error :" + error);
  	}
  }

  startgeolocation(){
  	let geoOptions = { enableHighAccuracy: true }
  	this.geo.watchPosition(geoOptions).subscribe(data=>{
  		try{
  			this.latitude = data.coords.latitude;
  			this.longitude = data.coords.longitude;

  			this.map.addMarker({
  				title : 'Hello from ionic',
					icon : 'red',
					animation : 'DROP',
					position : {
						lat: this.latitude,
						lng: this.longitude
					}
  			});

  			var GOOGLE = {'lat': this.latitude,'lng': this.longitude};

  			this.map.moveCamera({
  				'target': GOOGLE,
  				'tilt': this.tiltValue,
  				'zoom': this.zoomValue,
  				'bearing': this.bearingValue 
  			});

  		}catch(error){
  			alert("Geo Error " + error)
  		}
  	})
  }

  stopgeolocation(){

  }

  setBearing(bearing){
  	this.bearingValue = bearing;
  	this.updateMap();
  }

  setTilt(tilt){
  	this.tiltValue = tilt;
  	this.updateMap();
  }

  setZoom(zoom){
  	this.zoomValue = zoom;
  	this.updateMap();
  }

  updateMap(){
  	var GOOGLE = {'lat': this.latitude, 'lng': this.longitude}
  	this.map.moveCamera({
  		'target': GOOGLE,
			'tilt': this.tiltValue,
			'zoom': this.zoomValue,
			'bearing': this.bearingValue 
  	});
  }

}
