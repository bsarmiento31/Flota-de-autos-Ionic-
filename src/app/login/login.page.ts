import { Component, OnInit,ViewChild } from '@angular/core';
// import { IonSlides } from '@ionic/angular';
import { AlertController, LoadingController,IonSlides,NavController,NavParams } from '@ionic/angular';
import { UsuarioService } from '../services/usuario.service';
import { HomePage } from '../home/home.page';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html', 
  styleUrls: ['./login.page.scss'],
  providers: [NavController]
})
export class LoginPage implements OnInit { 



  // @ViewChild('slides', { read: IonSlides }) slides: IonSlides;
  // @ViewChild('mySlider') slides: IonSlides;
  
  @ViewChild('mySlider',{static: false}) slides: IonSlides;
  
  

  slideOpts = {
    initialSlide: 0,
    speed: 400,
    pagination: {
      type: 'progress'
    },
    allowTouchMove: false,
    
  };

  

  
  

  constructor(public alertController: AlertController, 
    public loadingCtrl: LoadingController,
    public _usuarioProv: UsuarioService,
    public navCtrl: NavController) { }

  ngOnInit() {


  }

  async mostrarInput(){
    const alert = await this.alertController.create({

      header: 'Ingrese el usuario',
      inputs: [{
        name: 'username',
        placeholder: 'Username'
      }],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },{
          text: 'Ingresar',
          handler: data => {
            // console.log(data);
            this.verificarUsuario( data.username );
          }
        }
        
      ]

    })
    await alert.present();
  }

  async verificarUsuario( clave:string){
    const  loading = await this.loadingCtrl.create({

        message: 'Verificando',
        duration: 3000

      });

      // console.log(clave);

      this._usuarioProv.verificaUsuario( clave )
      .then(existe=>{
            
              loading.dismiss();
            
            if(existe){
              
              // this.slideOpts.allowTouchMove = true;
              // this.slideOpts.initialSlide = 1;
              this.slides.lockSwipes(false);
              this.slides.slideNext();
              this.slides.lockSwipes(true);
              
            }else{

              this.claveInvalida();

            }
      })

      await loading.present();
  }

  //Mostrar alert cuando la clave sea invalida

  async claveInvalida(){
    const alert = await  this.alertController.create({
      header: 'Usuario Incorrecto',
      subHeader: 'pruebe de nuevo',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        }
      ]
    });

    return await alert.present();
  }

  ingresar(){
    this.navCtrl.navigateRoot( '/home' );
    //  console.log("hola");
  }

}
