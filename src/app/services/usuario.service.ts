import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Subscription } from 'rxjs';
//Tambien hay que instalar el angular firestore
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  clave:string;
  user:any = {};


  private doc: Subscription;

  constructor( private afDB: AngularFirestore,
              private platform: Platform,
              private storage: Storage ) { }

  

  verificaUsuario( clave: string ){

    clave = clave.toLocaleLowerCase();
    return new Promise((  resolve, reject ) => {

        this.doc = this.afDB.doc(`/usuarios/${ clave }`)
            .valueChanges().subscribe( data => {
                // console.log(data);

                if(data){
                    //Correcto
                    
                    this.clave = clave;
                    this.user = data;
                    this.guardarStorage();
                    resolve(true);
                    
                }else{
                  resolve(false);
                }

            })

    });
  }

//Guardar la clave(antes de hacer el metodo hay que ejecutar ionic cordova plugin add cordova-sqlite-storage para que lo instale y despues npm install --save @ionic/storage)
guardarStorage(){

        if(this.platform.is('cordova')){

          //celular

          this.storage.set('clave', this.clave);

        }else{
          //escritorio
          localStorage.setItem('clave',this.clave);
        }

}

cargarStorage(){

  return new Promise( ( resolve,reject ) => {

    if(this.platform.is('cordova')){

      //celular

      this.storage.get('clave').then( val=> {

        if( val ){
            this.clave = val;
            resolve(true);
        }else{
          resolve(false);
        }

      });


    }else{
      //escritorio

      if(localStorage.getItem('clave')){
        
          this.clave = localStorage.getItem('clave');
          resolve(true);

      } else{
        resolve(false);
      } 
    }

  });

}

//para destruir el usuario cuando se cierre session
borrarUsuario(){
      this.clave = null;

      if( this.platform.is('cordova') ){
            this.storage.remove('clave');
      }else{
        localStorage.removeItem('clave');
      }
      this.doc.unsubscribe();
}


}
