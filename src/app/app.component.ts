import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormGroup, Validators} from '@angular/forms';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';
import Swal from 'sweetalert2';

import { CommonModule } from '@angular/common';
import emailDataJson from '../environments/prod-environment-data.json'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ReactiveFormsModule,
    FormsModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
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
    {imgUrl:'tes-logo.webp', imgAlt:'Tucson Esperanza Hispanic Church Logo'},
    {imgUrl:'tss-logo.webp', imgAlt:'Tucson South Hispanic Church Logo'}
  ];

  contactForm = new FormGroup({
    option: new FormControl<string>('', [Validators.required]),
    user_name: new FormControl<string>('', [Validators.required]),
    phone_number: new FormControl<string>('', [Validators.required]),
    address: new FormControl<string>('', [Validators.required]),
  });

  constructor(
    private router: Router)
  {
  }

  sendEmail():void {
    const formValues = this.contactForm.value;

    const templateParams = {
      option: formValues.option,
      userName: formValues.user_name,
      to_name: 'Ptr. Jose Pablo Chan',
      phoneNumber: formValues.phone_number,
      address: formValues.address,
    };

    emailjs
    .send(
      // @ts-ignore
      emailDataJson.serviceId ?? environment.SERVICE_ID,
      // @ts-ignore
      emailDataJson.templateId  ?? environment.TEMPLATE_ID,
      templateParams,
      // @ts-ignore
      emailDataJson.publicKey  ?? environment.PUBLIC_KEY,
    )
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
