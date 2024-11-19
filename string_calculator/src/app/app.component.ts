import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'string_calculator';
  stringValue = ''
  output!: number;
  error!: string;

  calculateSum(): void {
    if (!this.stringValue) {
      this.output = 0;
      this.error = '';
      return;
    }

    try {
      const sum = this.add(this.stringValue);
      this.output = sum;
      this.error = '';  
    } catch (e) {
      this.error = (e instanceof Error) ? e.message : 'An unexpected error occurred';
      this.output = 0;
    }
  }

  private add(input: string): number {
    const numbers = input.split(',').map(Number);

    if (numbers.some(isNaN)) {
      throw new Error('Input string contains non-numeric values');
    }

    return numbers.reduce((a, b) => a + b, 0);
  }

}
