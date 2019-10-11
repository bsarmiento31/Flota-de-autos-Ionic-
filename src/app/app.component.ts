import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { UsuarioService } from './services/usuario.service';
import { Router } from '@angular/router';
import { Environment } from '@ionic-native/google-maps';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public _usuarioProv: UsuarioService,
    private router: Router,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

     

      this._usuarioProv.cargarStorage().then( existe =>{

      this.statusBar.styleDefault();
      this.splashScreen.hide();
          
        if( existe ){
            
          this.router.navigate(['/home']);

        }else{
          this.router.navigate(['/login']);
        }

      })  

      
    });
  }
}
