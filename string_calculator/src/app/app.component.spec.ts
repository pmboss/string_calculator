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

  it(`should have the 'String Calculator' title`, () => {
    expect(component.title).toEqual('String Calculator');
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

  it('should handle a case where numbers are separated by commas and newlines', () => {
    component.stringValue = '1\\n2,3';
    component.calculateSum();
    expect(component.output).toBe(6);
    expect(component.error).toBe('');
  });

  it('should throw an error when negative numbers are included', () => {
    component.stringValue = '1,-2,3,-4';
    component.calculateSum();
    expect(component.output).toBe(0);
    expect(component.error).toBe('Negative numbers not allowed: -2, -4');
  });

  it('should handle the case with an empty number list after the custom delimiter', () => {
    component.stringValue = '//;\\n';
    component.calculateSum();
    expect(component.output).toBe(0);
    expect(component.error).toBe('');
  });

  it('should return correct sum when numbers are separated by custom delimiter and newlines', () => {
    component.stringValue = '//;\\n1;2;3;5';
    component.calculateSum();
    expect(component.output).toBe(11);
    expect(component.error).toBe('');
  });
});
