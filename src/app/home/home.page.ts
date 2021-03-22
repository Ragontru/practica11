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
  matching_passwords_group: FormGroup;
  
  validation_messages = {
    'dni': [
      { type: 'required', message: 'DNI is required.' },
      { type: 'minlength', message: 'DNI must be at least 9 characters long.' },
      { type: 'maxlength', message: 'DNI cannot be more than 9 characters long.' },
      { type: 'pattern', message: 'Your DNI must contain only numbers and letters, and must ending with a letter.' },
      { type: 'validDNI', message: 'Your DNI has already been taken.' }
    ],
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
        this.validIBAN,
        Validators.maxLength(24),
        Validators.minLength(24),
        Validators.pattern('ES'),
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

    var numero
    var letra
    var letraC

    if (fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "cba321") {
      return ({ validDNI: true });
    } else {
      return (null);
    }
  }

  validIBAN(fc: FormControl){

  }

}