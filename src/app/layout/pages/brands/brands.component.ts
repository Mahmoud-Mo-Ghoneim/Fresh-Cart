import { Component, OnInit } from '@angular/core';
import { Brands } from '../../../shared/interfaces/brands';
import { FlowbiteService } from '../../../shared/flowbite/flowbite.service';
import { BrandsService } from '../../../shared/services/brands/brands.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  brandsData: Brands | null = null;
  isLoading: boolean = true;
  constructor(
    private _BrandsService: BrandsService,
    private _FlowbiteService: FlowbiteService,
    private _Title: Title
  ) {}
  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('currentPage', '/brands');
    }
    this.getAllBrands();
    this._Title.setTitle('Brands');
  }

  getAllBrands(page?: string): void {
    this._BrandsService.getAllBrands().subscribe((res) => {
      this.brandsData = res;
      this.isLoading = false;
    });
  }

  openModal(image: string, name: string): void {
    let modalContainer = document.querySelector('.modal-container');
    let modalImage = document.querySelector('.modal-image');
    let modalHeader = document.querySelector('.modal-header');

    modalContainer?.classList.replace('invisible', 'visible');
    modalContainer?.classList.replace('top-[-40%]', 'top-0');
    document
      .querySelector('.modal-popup')
      ?.classList.replace('opacity-0', 'opacity-100');
    modalImage?.setAttribute('src', image);
    modalImage?.setAttribute('alt', name);
    modalHeader!.textContent = name;
  }

  closeModal(): void {
    let modalContainer = document.querySelector('.modal-container');
    let modalPopup = document.querySelector('.modal-popup');

    modalContainer?.classList.replace('top-0', 'top-[-40%]');
    modalPopup?.classList.replace('opacity-100', 'opacity-0');
    modalContainer?.classList.replace('visible', 'invisible');
  }
}
