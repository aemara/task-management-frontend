import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { UiService } from 'src/app/services/ui.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.css'],
})
export class AddColumnComponent implements OnInit {
  columnForm!: FormGroup;
  boardId!: string;

  constructor(
    private http: HttpService,
    private uiService: UiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.boardId = this.uiService.boardId;
    this.columnForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    const dataToSend = {
      title: this.columnForm.value.name,
    };
    this.http.addColumn(dataToSend, this.boardId).subscribe();
    this.router.navigate(['']);
  }
}
