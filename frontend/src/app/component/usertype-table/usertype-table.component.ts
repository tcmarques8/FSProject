import { Component } from '@angular/core';
import { Usertype } from '../../model/usertype';
import { ActivatedRoute, Router } from '@angular/router';
import { UsertypeService } from '../../services/usertype.service';

@Component({
  selector: 'app-usertype-table',
  templateUrl: './usertype-table.component.html',
  styleUrl: './usertype-table.component.css'
})
export class UserTypeTableComponent {
  title="User Type list";
  typeusers: Usertype[] = [];
  tableColumns: string[] = ['Id', 'Type'];

  //variables to sort the table
  sortKey: any = '';
  reverse: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private userTypeService: UsertypeService){
  }

  ngOnInit(){
    this.loadData();
  }

  loadData(){
    this.userTypeService.findUsersType().subscribe(data => {
      this.typeusers = data;
    })
  }

  editUserType(id: any){
    this.router.navigate(['/editusertype', id]);
  }

  deleteUserType(userTypeId: any){
    confirm("Are you sure you want to delete this user type?")
    this.userTypeService.delete(userTypeId).subscribe(result => this.loadData())
      
  }

  sortTable(key: any){
    //function to sort table in ascending or descending order by key name
    key = key.charAt(0).toLowerCase() + key.slice(1);
    this.reverse = this.sortKey === key ? !this.reverse : false;
    this.sortKey = key;
    this.typeusers.sort((a, b) => {
      const x = a[key as keyof Usertype];
      const y = b[key as keyof Usertype];
      return this.reverse ? (x > y ? -1 : 1) : (x < y ? -1 : 1)
    });
  }
  
 
}
