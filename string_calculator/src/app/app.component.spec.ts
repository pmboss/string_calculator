import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  beforeEach(async () => {
    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should return 0 for an empty string', () => {
    component.stringValue = '';
    component.calculateSum();
    expect(component.output).toBe(0);
    expect(component.error).toBe('');
  });

  it('should return the number itself for a single number', () => {
    component.stringValue = '5';
    component.calculateSum();
    expect(component.output).toBe(5);
    expect(component.error).toBe('');
  });

  it('should return the sum of multiple numbers', () => {
    component.stringValue = '1,2,3';
    component.calculateSum();
    expect(component.output).toBe(6);
    expect(component.error).toBe('');
  });

  it('should handle an error when non-numeric values are included', () => {
    component.stringValue = '1,abc,3';
    component.calculateSum();
    expect(component.output).toBe(0);
    expect(component.error).toBe('Input string contains non-numeric values');
  });
});
