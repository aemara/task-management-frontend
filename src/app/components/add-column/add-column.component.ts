import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpService } from 'src/app/services/http.service';
import { UiService } from 'src/app/services/ui.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-add-column',
  templateUrl: './add-column.component.html',
  styleUrls: ['./add-column.component.css'],
})
export class AddColumnComponent implements OnInit {
  @Output() hideAddColumn = new EventEmitter<any>();
  columnForm!: FormGroup;
  boardId!: string;

  constructor(
    private http: HttpService,
    private uiService: UiService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.uiService.fetchingState$.subscribe((state) => {
      if (state) this.boardId = state.boardId;
    });
    this.columnForm = new FormGroup({
      name: new FormControl(null, Validators.required),
    });
  }

  onHideAddColumn(event: any) {
    if (event.target.className === 'add-column-modal') {
      this.hideAddColumn.emit();
    }
  }

  onSubmit() {
    const dataToSend = {
      title: this.columnForm.value.name,
    };
    this.http.addColumn(dataToSend, this.boardId).subscribe(() => {
      this.hideAddColumn.emit();
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([this.router.url]);
    });
  }
}
