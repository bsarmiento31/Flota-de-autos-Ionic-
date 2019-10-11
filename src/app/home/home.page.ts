import { Component } from '@angular/core';
import { UbicacionService } from '../services/ubicacion.service';
import {
  ToastController,
  Platform,
  LoadingController,
  NavController
} from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'], 
})
export class HomePage {

  

  title: string = 'My first AGM project';
  lat: number;
  lng: number;
  height = 0;

  user:any = {};
  
  constructor( public _ubicacionProv: UbicacionService,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              private platform: Platform,
              public navCtrl: NavController,
              public _usuarioProv: UsuarioService) {
    this._ubicacionProv.iniciarGeolocalizacion();
    this._ubicacionProv.inicializarTaxista();
    //Esto es para traernos la ubicacion(lat,long) del usuario en firebase
    this._ubicacionProv.taxista.valueChanges().subscribe( data=> {
          // console.log(data);
          this.user = data;
          // console.log(platform.height());
          this.height = platform.height() - 56;

    }); 
  }
 
  salir(){
    
    this._ubicacionProv.detenerUbicacion();
    this._usuarioProv.borrarUsuario();
    this.navCtrl.navigateRoot( '/login' );

  }


  
  
}
