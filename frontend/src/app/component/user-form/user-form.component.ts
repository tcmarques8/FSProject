import { Component, Input } from '@angular/core';
import { User } from '../../model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from '../../services/user-service.service';
import { UsertypeService } from '../../services/usertype.service';
import { Usertype } from '../../model/usertype';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})

export class UserFormComponent {
  id?: any;
  isEditMode?: boolean;

  userForm!: FormGroup;
  
  userTypeList: Usertype[] = [];
  user: User;
  isSucessfull: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserServiceService, private userTypeService: UsertypeService){
    this.user = new User();
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = this.id ? true : false;
    this.validationsForm();
    this.loadUsersType();
    if (this.isEditMode) {
      this.validationsForm();
      this.userService.findById(this.id).subscribe(user => {
        this.userForm.patchValue(user);
        this.userForm.patchValue({
          usertype: user.usertype.type
        })
        this.loadUsersType();
      });

    }
  }
  validationsForm(){
    this.userForm = new FormGroup({
      name: new FormControl('', Validators.required),
      firstname: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      usertype: new FormControl('', Validators.required)
    })
  }

  loadUsersType(){
    this.userTypeService.findUsersType().subscribe(data => {
      this.userTypeList = data;
    })
  }

  onSubmit() { 
    this.validateUser() 
  }


  validateUser(){

    if (this.userForm.valid) {
      let usernew = new User();
      let typenew = new Usertype();
      usernew.name=this.userForm.get('name')?.value;
      usernew.firstname=this.userForm.get('firstname')?.value;
      usernew.email=this.userForm.get('email')?.value;

      if (this.userForm.get('usertype')?.value ) {
        this.userTypeList.forEach(element => {
          if(element.type === this.userForm.get('usertype')?.value){
            typenew.id = element.id;
            typenew.type = element.type;
          }
        });

        usernew.usertype = typenew;
      } else {
        console.error("The form control or its value is null.");
      }
      
      if (this.isEditMode) {
        this.updateUser(usernew);
      } else {
        this.createUser(usernew);
      }
      
    }
  }

  createUser(usernew: User){
    this.userService.save(usernew).subscribe(
      response => {
        this.gotoUserList()
      },
      error => {
         console.error('Error saving user:', error);
      });
  }

  gotoUserList(){
    this.router.navigate(['/users']);
  }

  updateUser(usernew: User){
    usernew.id = this.id;
    this.userService.edit(usernew).subscribe(
      response => {
        this.gotoUserList()
      },
      error => {
         console.error('Error updating user:', error);
      });
  }

}
