import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-color-picker',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AppComponent),
      multi: true
    }
  ]
})
export class ColorPickerComponent implements OnInit {
  @Input() colors: string[] = ['#FF0000', '#339966', '#0000FF', '#FFFF00', '#556B2F', '#FF6666','#FFEFD5', "#000000"];
  selectedColor!: string;
  onChange: any = () => { };
  onTouch: any = () => { };
  SelectedCor:any;
  constructor() {}

  ngOnInit(): void {
  }

  writeValue(value: any): void {
    this.selectedColor = value;
  }


  selectColor(color: string) {
    this.selectedColor = color;
    this.onChange(this.selectedColor);
    this.onTouch(this.selectedColor);    
  }

  //  Manage arrow event
  onKeyDown(event: KeyboardEvent) {
    if (this.colors.length === 0) return;

    const currentIndex = this.colors.indexOf(this.selectedColor);
    let newIndex = currentIndex;

    switch (event.key) {
      case 'ArrowUp':
        newIndex = currentIndex - 1;
        break;
      case 'ArrowDown':
        newIndex = currentIndex + 1;
        break;
      case 'ArrowLeft':
        newIndex = currentIndex === 0 ? this.colors.length - 1 : currentIndex - 1;
        break;
      case 'ArrowRight':
        newIndex = currentIndex === this.colors.length - 1 ? 0 : currentIndex + 1;
        break;
      default:
        return;
    }

    newIndex = Math.max(0, Math.min(this.colors.length - 1, newIndex));

    this.selectedColor = this.colors[newIndex];
    this.onChange(this.selectedColor);
    this.onTouch(this.selectedColor);
  }

//  show selected color
  getSelectedColor(){
    this.SelectedCor = this.selectedColor
  }
}
