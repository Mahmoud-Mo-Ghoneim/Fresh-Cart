import { category } from './../../../shared/interfaces/category';
import { CategoryService } from './../../../shared/services/categories/category.service';
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-categoryslider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './categoryslider.component.html',
  styleUrl: './categoryslider.component.scss',
})
export class CategorysliderComponent implements OnInit {
  categoryList!: category[];
  isLoading!: boolean;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 7,
      },
    },
    nav: true,
  };

  constructor(private _CategoryService: CategoryService) {}
  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories() {
    this.isLoading = true;
    this._CategoryService.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data;
        this.isLoading = false;
        console.log(this.categoryList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
