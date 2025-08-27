import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Sorting Algorithm Timer';
  
  // Array to be sorted
  unsortedArray: number[] = [];
  sortedArray: number[] = [];
  
  // Timer properties
  startTime: number = 0;
  endTime: number = 0;
  executionTime: number = 0;
  
  // Control properties
  arraySize: number = 1000;
  algorithmType: string = 'bubble';
  isRunning: boolean = false;
  
  // Generate a random array of specified size
  generateArray(): void {
    this.unsortedArray = [];
    for (let i = 0; i < this.arraySize; i++) {
      this.unsortedArray.push(Math.floor(Math.random() * 1000));
    }
    this.sortedArray = [];
    this.executionTime = 0;
  }
  
  // Run the selected sorting algorithm
  runSortingAlgorithm(): void {
    if (this.unsortedArray.length === 0) {
      this.generateArray();
    }
    
    this.isRunning = true;
    this.startTime = performance.now();
    
    // Clone the array to avoid modifying the original
    const arrayToSort = [...this.unsortedArray];
    
    switch (this.algorithmType) {
      case 'bubble':
        this.sortedArray = this.bubbleSort(arrayToSort);
        break;
      case 'quick':
        this.sortedArray = this.quickSort(arrayToSort);
        break;
      default:
        this.sortedArray = this.bubbleSort(arrayToSort);
    }
    
    this.endTime = performance.now();
    this.executionTime = this.endTime - this.startTime;
    this.isRunning = false;
  }
  
  // Bubble Sort implementation
  bubbleSort(arr: number[]): number[] {
    const array = [...arr];
    const n = array.length;
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        if (array[j] > array[j + 1]) {
          // Swap elements
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
        }
      }
    }
    
    return array;
  }
  
  // Quick Sort implementation
  quickSort(arr: number[]): number[] {
    const array = [...arr];
    
    if (array.length <= 1) {
      return array;
    }
    
    const pivot = array[Math.floor(array.length / 2)];
    const left = array.filter(x => x < pivot);
    const middle = array.filter(x => x === pivot);
    const right = array.filter(x => x > pivot);
    
    return [...this.quickSort(left), ...middle, ...this.quickSort(right)];
  }
}
