import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateaccountService } from '../../services/createaccountservice/createaccount.service';
import Swal from 'sweetalert2';
import { MemberService } from '../../services/membersservice/member.service';

@Component({
  selector: 'app-createaccount',
  templateUrl: './createaccount.component.html',
  styleUrls: ['./createaccount.component.css']
})
export class CreateaccountComponent implements OnInit {
  constructor(
    private router: Router,
    private service: CreateaccountService,
    private memberService:MemberService) { }
  userForm !: FormGroup;
  shouldAddClass1 = false;
  shouldAddClass2 = true;
  password = false
  repassword = false;
  loading:boolean = false;
  nationality: any[] = [
    {
      value: 'Tanzania, United Republic of',
      viewValue: 'Tanzania, United Republic of',
    },
    { value: 'Afghanistan', viewValue: 'Afghanistan' },
    { value: 'Aland Islands', viewValue: 'Aland Islands' },
    { value: 'Albania', viewValue: 'Albania' },
    { value: 'Algeria', viewValue: 'Algeria' },
    { value: 'American Samoa', viewValue: 'American Samoa' },
    { value: 'Andorra', viewValue: 'Andorra' },
    { value: 'Angola', viewValue: 'Angola' },
    { value: 'Anguilla', viewValue: 'Anguilla' },
    { value: 'Antarctica', viewValue: 'Antarctica' },
    { value: 'Antigua and Barbuda', viewValue: 'Antigua and Barbuda' },
    { value: 'Argentina', viewValue: 'Argentina' },
    { value: 'Armenia', viewValue: 'Armenia' },
    { value: 'Aruba', viewValue: 'Aruba' },
    { value: 'Australia', viewValue: 'Australia' },
    { value: 'Austria', viewValue: 'Austria' },
    { value: 'Azerbaijan', viewValue: 'Azerbaijan' },
    { value: 'Bahamas', viewValue: 'Bahamas' },
    { value: 'Bahrain', viewValue: 'Bahrain' },
    { value: 'Bangladesh', viewValue: 'Bangladesh' },
    { value: 'Barbados', viewValue: 'Barbados' },
    { value: 'Belarus', viewValue: 'Belarus' },
    { value: 'Belgium', viewValue: 'Belgium' },
    { value: 'Belize', viewValue: 'Belize' },
    { value: 'Benin', viewValue: 'Benin' },
    { value: 'Bermuda', viewValue: 'Bermuda' },
    { value: 'Bhutan', viewValue: 'Bhutan' },
    { value: 'Bolivia', viewValue: 'Bolivia' },
    {
      value: 'Bonaire, Sint Eustatius and Saba',
      viewValue: 'Bonaire, Sint Eustatius and Saba',
    },
    { value: 'Bosnia and Herzegovina', viewValue: 'Bosnia and Herzegovina' },
    { value: 'Botswana', viewValue: 'Botswana' },
    { value: 'Bouvet Island', viewValue: 'Bouvet Island' },
    { value: 'Brazil', viewValue: 'Brazil' },
    {
      value: 'British Indian Ocean Territory',
      viewValue: 'British Indian Ocean Territory',
    },
    { value: 'Brunei Darussalam', viewValue: 'Brunei Darussalam' },
    { value: 'Bulgaria', viewValue: 'Bulgaria' },
    { value: 'Burkina Faso', viewValue: 'Burkina Faso' },
    { value: 'Burundi', viewValue: 'Burundi' },
    { value: 'Cambodia', viewValue: 'Cambodia' },
    { value: 'Cameroon', viewValue: 'Cameroon' },
    { value: 'Canada', viewValue: 'Canada' },
    { value: 'Cape Verde', viewValue: 'Cape Verde' },
    { value: 'Cayman Islands', viewValue: 'Cayman Islands' },
    {
      value: 'Central African Republic',
      viewValue: 'Central African Republic',
    },
    { value: 'Chad', viewValue: 'Chad' },
    { value: 'Chile', viewValue: 'Chile' },
    { value: 'China', viewValue: 'China' },
    { value: 'Christmas Island', viewValue: 'Christmas Island' },
    { value: 'Cocos (Keeling) Islands', viewValue: 'Cocos (Keeling) Islands' },
    { value: 'Colombia', viewValue: 'Colombia' },
    { value: 'Comoros', viewValue: 'Comoros' },
    { value: 'Congo', viewValue: 'Congo' },
    {
      value: 'Congo, Democratic Republic of the Congo',
      viewValue: 'Congo, Democratic Republic of the Congo',
    },
    { value: 'Cook Islands', viewValue: 'Cook Islands' },
    { value: 'Costa Rica', viewValue: 'Costa Rica' },
    { value: "Cote D'Ivoire", viewValue: "Cote D'Ivoire" },
    { value: 'Croatia', viewValue: 'Croatia' },
    { value: 'Cuba', viewValue: 'Cuba' },
    { value: 'Curacao', viewValue: 'Curacao' },
    { value: 'Cyprus', viewValue: 'Cyprus' },
    { value: 'Czech Republic', viewValue: 'Czech Republic' },
    { value: 'Denmark', viewValue: 'Denmark' },
    { value: 'Djibouti', viewValue: 'Djibouti' },
    { value: 'Dominica', viewValue: 'Dominica' },
    { value: 'Dominican Republic', viewValue: 'Dominican Republic' },
    { value: 'Ecuador', viewValue: 'Ecuador' },
    { value: 'Egypt', viewValue: 'Egypt' },
    { value: 'El Salvador', viewValue: 'El Salvador' },
    { value: 'Equatorial Guinea', viewValue: 'Equatorial Guinea' },
    { value: 'Eritrea', viewValue: 'Eritrea' },
    { value: 'Estonia', viewValue: 'Estonia' },
    { value: 'Ethiopia', viewValue: 'Ethiopia' },
    {
      value: 'Falkland Islands (Malvinas)',
      viewValue: 'Falkland Islands (Malvinas)',
    },
    { value: 'Faroe Islands', viewValue: 'Faroe Islands' },
    { value: 'Fiji', viewValue: 'Fiji' },
    { value: 'Finland', viewValue: 'Finland' },
    { value: 'France', viewValue: 'France' },
    { value: 'French Guiana', viewValue: 'French Guiana' },
    { value: 'French Polynesia', viewValue: 'French Polynesia' },
    {
      value: 'French Southern Territories',
      viewValue: 'French Southern Territories',
    },
    { value: 'Gabon', viewValue: 'Gabon' },
    { value: 'Gambia', viewValue: 'Gambia' },
    { value: 'Georgia', viewValue: 'Georgia' },
    { value: 'Germany', viewValue: 'Germany' },
    { value: 'Ghana', viewValue: 'Ghana' },
    { value: 'Gibraltar', viewValue: 'Gibraltar' },
    { value: 'Greece', viewValue: 'Greece' },
    { value: 'Greenland', viewValue: 'Greenland' },
    { value: 'Grenada', viewValue: 'Grenada' },
    { value: 'Guadeloupe', viewValue: 'Guadeloupe' },
    { value: 'Guam', viewValue: 'Guam' },
    { value: 'Guatemala', viewValue: 'Guatemala' },
    { value: 'Guernsey', viewValue: 'Guernsey' },
    { value: 'Guinea', viewValue: 'Guinea' },
    { value: 'Guinea-Bissau', viewValue: 'Guinea-Bissau' },
    { value: 'Guyana', viewValue: 'Guyana' },
    { value: 'Haiti', viewValue: 'Haiti' },
    {
      value: 'Heard Island and Mcdonald Islands',
      viewValue: 'Heard Island and Mcdonald Islands',
    },
    {
      value: 'Holy See (Vatican City State)',
      viewValue: 'Holy See (Vatican City State)',
    },
    { value: 'Honduras', viewValue: 'Honduras' },
    { value: 'Hong Kong', viewValue: 'Hong Kong' },
    { value: 'Hungary', viewValue: 'Hungary' },
    { value: 'Iceland', viewValue: 'Iceland' },
    { value: 'India', viewValue: 'India' },
    { value: 'Indonesia', viewValue: 'Indonesia' },
    {
      value: 'Iran, Islamic Republic of',
      viewValue: 'Iran, Islamic Republic of',
    },
    { value: 'Iraq', viewValue: 'Iraq' },
    { value: 'Ireland', viewValue: 'Ireland' },
    { value: 'Isle of Man', viewValue: 'Isle of Man' },
    { value: 'Israel', viewValue: 'Israel' },
    { value: 'Italy', viewValue: 'Italy' },
    { value: 'Jamaica', viewValue: 'Jamaica' },
    { value: 'Japan', viewValue: 'Japan' },
    { value: 'Jersey', viewValue: 'Jersey' },
    { value: 'Jordan', viewValue: 'Jordan' },
    { value: 'Kazakhstan', viewValue: 'Kazakhstan' },
    { value: 'Kenya', viewValue: 'Kenya' },
    { value: 'Kiribati', viewValue: 'Kiribati' },
    {
      value: "Korea, Democratic People's Republic of",
      viewValue: "Korea, Democratic People's Republic of",
    },
    { value: 'Korea, Republic of', viewValue: 'Korea, Republic of' },
    { value: 'Kosovo', viewValue: 'Kosovo' },
    { value: 'Kuwait', viewValue: 'Kuwait' },
    { value: 'Kyrgyzstan', viewValue: 'Kyrgyzstan' },
    {
      value: "Lao People's Democratic Republic",
      viewValue: "Lao People's Democratic Republic",
    },
    { value: 'Latvia', viewValue: 'Latvia' },
    { value: 'Lebanon', viewValue: 'Lebanon' },
    { value: 'Lesotho', viewValue: 'Lesotho' },
    { value: 'Liberia', viewValue: 'Liberia' },
    { value: 'Libyan Arab Jamahiriya', viewValue: 'Libyan Arab Jamahiriya' },
    { value: 'Liechtenstein', viewValue: 'Liechtenstein' },
    { value: 'Lithuania', viewValue: 'Lithuania' },
    { value: 'Luxembourg', viewValue: 'Luxembourg' },
    { value: 'Macao', viewValue: 'Macao' },
    {
      value: 'Macedonia, the Former Yugoslav Republic of',
      viewValue: 'Macedonia, the Former Yugoslav Republic of',
    },
    { value: 'Madagascar', viewValue: 'Madagascar' },
    { value: 'Malawi', viewValue: 'Malawi' },
    { value: 'Malaysia', viewValue: 'Malaysia' },
    { value: 'Maldives', viewValue: 'Maldives' },
    { value: 'Mali', viewValue: 'Mali' },
    { value: 'Malta', viewValue: 'Malta' },
    { value: 'Marshall Islands', viewValue: 'Marshall Islands' },
    { value: 'Martinique', viewValue: 'Martinique' },
    { value: 'Mauritania', viewValue: 'Mauritania' },
    { value: 'Mauritius', viewValue: 'Mauritius' },
    { value: 'Mayotte', viewValue: 'Mayotte' },
    { value: 'Mexico', viewValue: 'Mexico' },
    {
      value: 'Micronesia, Federated States of',
      viewValue: 'Micronesia, Federated States of',
    },
    { value: 'Moldova, Republic of', viewValue: 'Moldova, Republic of' },
    { value: 'Monaco', viewValue: 'Monaco' },
    { value: 'Mongolia', viewValue: 'Mongolia' },
    { value: 'Montenegro', viewValue: 'Montenegro' },
    { value: 'Montserrat', viewValue: 'Montserrat' },
    { value: 'Morocco', viewValue: 'Morocco' },
    { value: 'Mozambique', viewValue: 'Mozambique' },
    { value: 'Myanmar', viewValue: 'Myanmar' },
    { value: 'Namibia', viewValue: 'Namibia' },
    { value: 'Nauru', viewValue: 'Nauru' },
    { value: 'Nepal', viewValue: 'Nepal' },
    { value: 'Netherlands', viewValue: 'Netherlands' },
    { value: 'Netherlands Antilles', viewValue: 'Netherlands Antilles' },
    { value: 'New Caledonia', viewValue: 'New Caledonia' },
    { value: 'New Zealand', viewValue: 'New Zealand' },
    { value: 'Nicaragua', viewValue: 'Nicaragua' },
    { value: 'Niger', viewValue: 'Niger' },
    { value: 'Nigeria', viewValue: 'Nigeria' },
    { value: 'Niue', viewValue: 'Niue' },
    { value: 'Norfolk Island', viewValue: 'Norfolk Island' },
    {
      value: 'Northern Mariana Islands',
      viewValue: 'Northern Mariana Islands',
    },
    { value: 'Norway', viewValue: 'Norway' },
    { value: 'Oman', viewValue: 'Oman' },
    { value: 'Pakistan', viewValue: 'Pakistan' },
    { value: 'Palau', viewValue: 'Palau' },
    {
      value: 'Palestinian Territory, Occupied',
      viewValue: 'Palestinian Territory, Occupied',
    },
    { value: 'Panama', viewValue: 'Panama' },
    { value: 'Papua New Guinea', viewValue: 'Papua New Guinea' },
    { value: 'Paraguay', viewValue: 'Paraguay' },
    { value: 'Peru', viewValue: 'Peru' },
    { value: 'Philippines', viewValue: 'Philippines' },
    { value: 'Pitcairn', viewValue: 'Pitcairn' },
    { value: 'Poland', viewValue: 'Poland' },
    { value: 'Portugal', viewValue: 'Portugal' },
    { value: 'Puerto Rico', viewValue: 'Puerto Rico' },
    { value: 'Qatar', viewValue: 'Qatar' },
    { value: 'Reunion', viewValue: 'Reunion' },
    { value: 'Romania', viewValue: 'Romania' },
    { value: 'Russian Federation', viewValue: 'Russian Federation' },
    { value: 'Rwanda', viewValue: 'Rwanda' },
    { value: 'Saint Barthelemy', viewValue: 'Saint Barthelemy' },
    { value: 'Saint Helena', viewValue: 'Saint Helena' },
    { value: 'Saint Kitts and Nevis', viewValue: 'Saint Kitts and Nevis' },
    { value: 'Saint Lucia', viewValue: 'Saint Lucia' },
    { value: 'Saint Martin', viewValue: 'Saint Martin' },
    {
      value: 'Saint Pierre and Miquelon',
      viewValue: 'Saint Pierre and Miquelon',
    },
    {
      value: 'Saint Vincent and the Grenadines',
      viewValue: 'Saint Vincent and the Grenadines',
    },
    { value: 'Samoa', viewValue: 'Samoa' },
    { value: 'San Marino', viewValue: 'San Marino' },
    { value: 'Sao Tome and Principe', viewValue: 'Sao Tome and Principe' },
    { value: 'Saudi Arabia', viewValue: 'Saudi Arabia' },
    { value: 'Senegal', viewValue: 'Senegal' },
    { value: 'Serbia', viewValue: 'Serbia' },
    { value: 'Serbia and Montenegro', viewValue: 'Serbia and Montenegro' },
    { value: 'Seychelles', viewValue: 'Seychelles' },
    { value: 'Sierra Leone', viewValue: 'Sierra Leone' },
    { value: 'Singapore', viewValue: 'Singapore' },
    { value: 'Sint Maarten', viewValue: 'Sint Maarten' },
    { value: 'Slovakia', viewValue: 'Slovakia' },
    { value: 'Slovenia', viewValue: 'Slovenia' },
    { value: 'Solomon Islands', viewValue: 'Solomon Islands' },
    { value: 'Somalia', viewValue: 'Somalia' },
    { value: 'South Africa', viewValue: 'South Africa' },
    {
      value: 'South Georgia and the South Sandwich Islands',
      viewValue: 'South Georgia and the South Sandwich Islands',
    },
    { value: 'South Sudan', viewValue: 'South Sudan' },
    { value: 'Spain', viewValue: 'Spain' },
    { value: 'Sri Lanka', viewValue: 'Sri Lanka' },
    { value: 'Sudan', viewValue: 'Sudan' },
    { value: 'Suriname', viewValue: 'Suriname' },
    { value: 'Svalbard and Jan Mayen', viewValue: 'Svalbard and Jan Mayen' },
    { value: 'Swaziland', viewValue: 'Swaziland' },
    { value: 'Sweden', viewValue: 'Sweden' },
    { value: 'Switzerland', viewValue: 'Switzerland' },
    { value: 'Syrian Arab Republic', viewValue: 'Syrian Arab Republic' },
    {
      value: 'Taiwan, Province of China',
      viewValue: 'Taiwan, Province of China',
    },
    { value: 'Tajikistan', viewValue: 'Tajikistan' },
    { value: 'Thailand', viewValue: 'Thailand' },
    { value: 'Timor-Leste', viewValue: 'Timor-Leste' },
    { value: 'Togo', viewValue: 'Togo' },
    { value: 'Tokelau', viewValue: 'Tokelau' },
    { value: 'Tonga', viewValue: 'Tonga' },
    { value: 'Trinidad and Tobago', viewValue: 'Trinidad and Tobago' },
    { value: 'Tunisia', viewValue: 'Tunisia' },
    { value: 'Turkey', viewValue: 'Turkey' },
    { value: 'Turkmenistan', viewValue: 'Turkmenistan' },
    {
      value: 'Turks and Caicos Islands',
      viewValue: 'Turks and Caicos Islands',
    },
    { value: 'Tuvalu', viewValue: 'Tuvalu' },
    { value: 'Uganda', viewValue: 'Uganda' },
    { value: 'Ukraine', viewValue: 'Ukraine' },
    { value: 'United Arab Emirates', viewValue: 'United Arab Emirates' },
    { value: 'United Kingdom', viewValue: 'United Kingdom' },
    { value: 'United States', viewValue: 'United States' },
    {
      value: 'United States Minor Outlying Islands',
      viewValue: 'United States Minor Outlying Islands',
    },
    { value: 'Uruguay', viewValue: 'Uruguay' },
    { value: 'Uzbekistan', viewValue: 'Uzbekistan' },
    { value: 'Vanuatu', viewValue: 'Vanuatu' },
    { value: 'Venezuela', viewValue: 'Venezuela' },
    { value: 'Viet Nam', viewValue: 'Viet Nam' },
    { value: 'Virgin Islands, British', viewValue: 'Virgin Islands, British' },
    { value: 'Virgin Islands, U.s.', viewValue: 'Virgin Islands, U.s.' },
    { value: 'Wallis and Futuna', viewValue: 'Wallis and Futuna' },
    { value: 'Western Sahara', viewValue: 'Western Sahara' },
    { value: 'Yemen', viewValue: 'Yemen' },
    { value: 'mbia', viewValue: 'mbia' },
    { value: 'Zimbabwe', viewValue: 'Zimbabwe' },
  ];

  ngOnInit(): void {
    this.createForm()
  }
  // Set your condition to add a class
  createForm() {
    this.userForm = new FormGroup({
      emailAddress:new FormControl(null,Validators.email),
        dob: new FormControl(null,Validators.required),
        nationality: new FormControl(null,Validators.required),
        idNumber: new FormControl(null,Validators.required),
        gender: new FormControl(null,Validators.required),
        fisrName: new FormControl(null,Validators.required),
        middleName: new FormControl(null,Validators.required),
        lastName: new FormControl(null,Validators.required),
        mobile: new FormControl(null,Validators.required),
    })

  }

  onCreate(){
    this.loading = true;
    const values = this.userForm.value;
    this.memberService.addMember(values).subscribe((resp:any)=>{
      this.loading = false;
      this.alert();
      this.reload()
    })
    
  }
  togglePassword(input: HTMLInputElement) {
    if (input.type === 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }
  inputData(data: any) {
    if (data != '') {
      this.shouldAddClass1 = false
    }

  }
  inputPass(data: any) {
    if (data != '') {
      this.password = false
    }

  }

  submit() {
    if (this.userForm.value.email == '') {
      this.shouldAddClass1 = true
    } else if (this.userForm.value.password == '') {
      this.password = true
    } else if (this.userForm.value.repassword != this.userForm.value.password) {
      this.repassword = true
    } else {
      this.userForm.patchValue({
        role: "MEMBER"
      })
      this.deleteControl('repassword');

      this.service.addPost(this.userForm.value).subscribe(
        (data: any) => {

          this.router.navigate(["/"])
          this.succeAlart()

        },
        (error: any) => {
          this.invalidAlart()
          // Perform actions based on the error, such as displaying an error message to the user
        }
      );
    }
  }


  deleteControl(key: string) {
    // Check if the control exists before removing it
    if (this.userForm.contains(key)) {
      this.userForm.removeControl(key);
    } else {
      console.error(`Control with key '${key}' does not exist.`);
    }
  }
  succeAlart() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'success',
      title: 'Signed in successfully'
    })
  }
  invalidAlart() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'error',
      title: 'Invalid Email Or Password'
    })
  }
  failedAlert() {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })

    Toast.fire({
      icon: 'error',
      title: 'Un Authorized'
    })
  }

  reload(){
    this.router.navigateByUrl('',{skipLocationChange:true}).then(()=>{
      this.router.navigate([''])
    })
  }

  alert(){
    Swal.fire({
      title: "Verify your Registration in your Email",
      showClass: {
        popup: `
          animate__animated
          animate__fadeInUp
          animate__faster
        `
      },
      hideClass: {
        popup: `
          animate__animated
          animate__fadeOutDown
          animate__faster
        `
      }
    });
  }

}
