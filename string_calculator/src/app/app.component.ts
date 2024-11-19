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
  title = 'String Calculator';
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
    let delimiter = /,|\\n/;
    let negativeNo: number[] = [];

    if (input.startsWith("//")) {
      const delimiterInfo = input.match(/\/\/(.+)\\n/); //this regex check custom delimeter //[delimiter]\n[numbers…] 
      if (delimiterInfo) {
        delimiter = new RegExp(delimiter.source + '|' + delimiterInfo[1]); // add custom delimiter to existing delimiter
        input = input.slice(delimiterInfo[0].length);
      }
    }
    const numbers = input.split(delimiter).map(Number);

    if (numbers.some(isNaN)) {
      throw new Error('Input string contains non-numeric values');
    }

    const total = numbers.reduce((sum, num) => {
      if (num < 0) {
        negativeNo.push(num);
      }
      return sum + num;
    }, 0);

    if (negativeNo.length) {
      throw new Error(`Negative numbers not allowed: ${negativeNo.join(', ')}`);
    }
    return total;
  }
}
