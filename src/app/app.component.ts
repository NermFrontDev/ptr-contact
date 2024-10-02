import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app-contact-form';

  datosContact = {
    verso : 'Porque de tal manera amó Dios al mundo, que ha dado a su Hijo unigénito, para que todo aquel que en él cree, no se pierda, mas tenga vida eterna.',
    cita : '(Juan 3:16)',
    welcome : 'Bienvenido',
  };

  optionsLabels = [
    'Deseo que oren por mí',
    'Deseo estudiar la Biblia',
    'Deseo una visita pastoral',
    'Deseo aceptar a Cristo como mi salvador',
    'Deseo bautizarme',
  ];

  imgLogos = [
    {imgUrl:'assets/img/tes-logo.webp', imgAlt:'Tucson Esperanza Hispanic Church Logo'},
    {imgUrl:'assets/img/tss-logo.webp', imgAlt:'Tucson South Hispanic Church Logo'}
  ]
}
