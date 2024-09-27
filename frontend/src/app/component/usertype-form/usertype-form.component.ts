import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsertypeService } from '../../services/usertype.service';
import { Usertype } from '../../model/usertype';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-usertype-form',
  templateUrl: './usertype-form.component.html',
  styleUrl: './usertype-form.component.css'
})
export class UsertypeFormComponent {

  id?: any;
  isEditMode?: boolean;

  typeForm!: FormGroup;
  typeUser: Usertype; 
  userTypeList: Usertype[] = [];
  //isSucessfull: boolean = false;

  constructor(private route: ActivatedRoute, private router: Router, private userTypeService: UsertypeService){
    this.typeUser = new Usertype();
  }
  ngOnInit(): void {
    //retrieve the id value for the param
    this.id = this.route.snapshot.params['id'];
    this.isEditMode = this.id ? true : false;
    this.validationsForm();
    this.loadUsersType();
    if (this.isEditMode) {
      this.validationsForm();
      this.userTypeService.findUserTypeById(this.id).subscribe(data => {
        // fill inputs of user
        this.typeForm.patchValue(data);
        //set the value of usertype to fill the select option
        this.typeForm.patchValue({
          type: data.type
        })
        this.loadUsersType();
      });

    }
    
  }

  onSubmit() {
    this.validateUserType();
    
  }

  validateUserType(){
    if (this.typeForm.valid) {
      let typenew = new Usertype();
      typenew.type=this.typeForm.get('type')?.value;
      
     if (this.isEditMode) {
        this.updateUserType(typenew);
      } else {
        this.createUserType(typenew);
      }

    }
  }

  validationsForm(){
    this.typeForm = new FormGroup({
      type: new FormControl('', Validators.required)
    })
  }

  loadUsersType(){
    this.userTypeService.findUsersType().subscribe(data => {
      this.userTypeList = data;
    })
  }

  createUserType(typenew : Usertype){
    this.userTypeService.save(typenew).subscribe(
      response => {
        //this.typeForm.reset();
        //this.isSucessfull = true;
        this.gotoTypeUserList();
   },
   error => {
      console.error('Error saving user:', error);
   });
  }

  updateUserType(typenew : Usertype){
    typenew.id = this.id;
    this.userTypeService.edit(typenew).subscribe(
      response => {
        //this.typeForm.reset();
        //this.isSucessfull = true;
        this.gotoTypeUserList();
      },
      error => {
         console.error('Error updating usertype:', error);
      });
  }

  gotoTypeUserList(){
    this.router.navigate(['/userstype']);
  }

  
}
