import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-notfount',
  standalone: true,
  imports: [],
  templateUrl: './notfount.component.html',
  styleUrl: './notfount.component.scss',
})
export class NotfountComponent implements OnInit {
  constructor(private _Title: Title) {}
  ngOnInit(): void {
    this._Title.setTitle('Page Not Found');
  }
}
