import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Church contact form';

  datosContact = {
    verso : 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.',
    cita : '(Juan 3:16)',
    welcome : 'Bienvenido',
  };

  optionsLabels: string[] = [
    'Deseo que oren por mí',
    'Deseo estudiar la Biblia',
    'Deseo una visita pastoral',
    'Deseo aceptar a Cristo como mi salvador',
    'Deseo bautizarme',
  ];

  imgLogos = [
    {imgUrl:'assets/img/tes-logo.webp', imgAlt:'Tucson Esperanza Hispanic Church Logo'},
    {imgUrl:'assets/img/tss-logo.webp', imgAlt:'Tucson South Hispanic Church Logo'}
  ];

  contactForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router)
  {
    this.contactForm = this.fb.group({
      option: ['', Validators.required],
      user_name: ['', Validators.required],
      phone_number: ['', Validators.required],
      address: ['', [Validators.required, Validators.email]],
    });
  }

  public sendEmail(e: Event):void {
    e.preventDefault();

    const formValues = this.contactForm.value;

    const templateParams = {
      option: formValues.option,
      userName: formValues.user_name,
      to_name: 'Ptr. Jose Pablo Chan',
      phoneNumber: formValues.phone_number,
      address: formValues.address,
    };

    emailjs
      .send(environment.emailjs.serviceId, environment.emailjs.templateId, templateParams, environment.emailjs.publicKey)
      .then(
        (response) => {
          this.showSuccess();
          console.log('SUCCESS!', response.status, response.text);
      },
      (error) => {
        console.log('FAILED...', (error as EmailJSResponseStatus).text);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong! Please try again later.',
        });
      }
    );
    this.onReset();
    /* if (this.contactForm.valid) {
    } */
  }

  onReset(): void {
    setTimeout(() => {
      this.contactForm.reset();
      window.location.reload();
    }, 3000);
  };

  showSuccess(): void {
    const userName = this.contactForm.get('user_name')?.value;
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Thanks ${userName}`,
      text: 'Your email was sent successfully!',
      showConfirmButton: false,
      timer: 2000
    });
  };
}
