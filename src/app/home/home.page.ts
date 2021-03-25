import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  validations_form: FormGroup;
  genders: Array<string>;
  
  validation_messages = {
    'dni': [
      { type: 'required', message: 'DNI is required.' },
      { type: 'minlength', message: 'DNI must be at least 9 characters long.' },
      { type: 'maxlength', message: 'DNI cannot be more than 9 characters long.' },
      { type: 'pattern', message: 'Your DNI must contain only 8 numbers and 1 letter' },
      { type: 'validDNI', message: 'The letter of your DNI isnt valid for this number.' }
    ],
    'iban': [
      { type: 'required', message: 'IBAN is required.' },
      { type: 'minlength', message: 'IBAN must be at least 24 characters long.' },
      { type: 'maxlength', message: 'IBAN cannot be more than 24 characters long.' },
      { type: 'pattern', message: 'Your IBAN isnt valid, it should start with "ES". ' }
    ]
  };

  constructor(
    public formBuilder: FormBuilder,
    private navCtrl: NavController
  ) { }

  ngOnInit() {

    this.validations_form = this.formBuilder.group({
      dni: new FormControl('', Validators.compose([
        this.validDNI,
        Validators.maxLength(9),
        Validators.minLength(9),
        Validators.pattern('[0-9]{8}[A-Za-z]{1}'),
        Validators.required
      ])),
      iban: new FormControl('',Validators.compose([
        Validators.maxLength(24),
        Validators.minLength(24),
        Validators.pattern('ES[0-9]{2}[0-9]{4}[0-9]{4}[0-9]{2}[0-9]{10}'),
        Validators.required
      ]))
    })
  }

  onSubmit(values) {
    console.log(values);
    let navigationExtras: NavigationExtras = {
      queryParams: {
        user: JSON.stringify(values),
        numero: 3
      }
    };
    this.navCtrl.navigateForward('/user', navigationExtras);
  }

  validDNI(fc: FormControl) {

    var numeros = fc.value.substring(0,fc.value.length-1);
    var numero = numeros % 23;
    var letrasValidas = "TRWAGMYFPDXBNJZSQVHLCKE";
    var letraCorr = letrasValidas.charAt(numero);
    var letra = fc.value.substring(8, 9);

    if (letraCorr != letra) {
      return ({ validDNI: true });
    } else {
      return (null);
    }

  }

}