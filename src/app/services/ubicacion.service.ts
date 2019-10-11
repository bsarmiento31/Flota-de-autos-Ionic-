import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
//AngularFirestoreDocument: Nos permite controlar el documento de firebase
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { UsuarioService } from './usuario.service';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  taxista: AngularFirestoreDocument<any>;
  //Para que el watch sea un observable
  private watch: Subscription;

  constructor( private geolocation: Geolocation,
              public _usuarioProv: UsuarioService,
              private afDB: AngularFirestore ) {
        
                //Nos traemo la clave del usuario del servicio usuario
                // this.taxista = afDB.doc(`/usuarios/${ _usuarioProv.clave }`);
      

   }

   inicializarTaxista(){
    this.taxista = this.afDB.doc(`/usuarios/${ this._usuarioProv.clave }`);
   }


  iniciarGeolocalizacion(){
    //Este codigo esta en la documentacion
    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude

      // console.log(resp.coords);
      this.taxista.update({
          lat: resp.coords.latitude,
          lng: resp.coords.longitude,
          clave: this._usuarioProv.clave
      });
      this.watch = this.geolocation.watchPosition().
          subscribe((data) => {
             // data can be a set of coordinates, or an error (if an error occurred).
             // data.coords.latitude
             // data.coords.longitude
            //  console.log('Watch: ', data.coords);
            this.taxista.update({
              lat: data.coords.latitude,
              lng: data.coords.longitude,
              clave: this._usuarioProv.clave
          });

    console.log( this.taxista );
      });

     }).catch((error) => {
       console.log('Error getting location', error);
     });
     
  }

  detenerUbicacion(){
    try{
      this.watch.unsubscribe();
    }catch(e){
      console.log(JSON.stringify(e));
    }
  }
}
