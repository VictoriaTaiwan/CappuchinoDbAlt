import { Component, OnInit } from '@angular/core';
import { DatabaseService } from "../../core/services/database/database.service";
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input'; 
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../core/models/database';

@Component({
  selector: 'app-home',
  imports:[MatTableModule, MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  data: Product[] = [];
  filteredData: Product[] = [];
  displayedColumns: string[] = ['image_src', 'name', 'calories', 'unit_name'];

  constructor(private databaseService: DatabaseService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.databaseService.getAllProducts().subscribe({
        next: (data) => {
          this.data = data;
          this.filteredData = data;
          console.log(data);
        },
        error: (error) => {
          this.data = [];
          this.filteredData = [];
          console.log(error);
        }
      }
    )
  }

  filterResults(text: string) {
    if (!text) {
      this.filteredData = this.data;
      return;
    }
  
    this.filteredData = this.data.filter(
      product => product?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

}
