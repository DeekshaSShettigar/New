import { Component, OnInit } from '@angular/core';
import { BaseRequestService } from 'services/base.service copy';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cpe-form',
  templateUrl: './cpe-form.component.html',
  styleUrls: ['./cpe-form.component.css']
})
export class CpeFormComponent implements OnInit {
  addProduct(data) {
    console.log(data);
    this.service.doRequest('/vulnerability/api/cpe_mapping', 'post', {
      params: data
    }).subscribe(result => {
      if (result.status === 'ok') {
        this.toastr.success('CPE mapping updated');
      } else {
        this.toastr.error(result.msg);
      }
    });
  }
  constructor(private service: BaseRequestService, public toastr: ToastrService) { }


  ngOnInit(): void {
  }

}
