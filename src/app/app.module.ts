import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy,NavController,NavParams  } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { UsuarioService } from '../app/services/usuario.service';

//firebase(hay que instalarlo antes(mirar documentacion))

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { firebaseConfig } from 'src/config/firebase.config';

//storage(hay que instalarlo antes)
import { IonicStorageModule } from '@ionic/storage';
//Plugins de geocalizacion(Mirar la documentacion de ionic para seguir los pasos geocalization)
import { Geolocation } from '@ionic-native/geolocation/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)],
  providers: [
    StatusBar,
    NavController,
    SplashScreen,
    UsuarioService,
    Geolocation,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
