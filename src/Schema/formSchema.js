import * as Yup from 'yup'

const URLRegex =
	/^((https?):\/\/)?(www\.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#\\/\-_]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/;


export const PersonalInfoSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    companyName: Yup.string().matches(/^[A-Za-z\s]+$/, 'Company Name can only contain letters')
    .required('Company Name is required'),
    zipCode: Yup.number()
      .typeError('Zip code must be a valid number')
    .required('Zip Code is required')
    .test('len', 'Zip code must be exactly 6 digits', val => val && String(val).length === 6)
    ,
    state: Yup.string()
    .required('Please select a state'),
    companyWebsite: Yup.string()
      .matches(URLRegex, 'Must be a valid URL')
      .required('Company website is required'),
  });

  
  export const PlanDetailsValSchema = Yup.object().shape({
    startDate: Yup.date()
        .required('Start Date is required')
        .nullable() 
        .typeError('Please enter a valid date'),

    plans: Yup.string()
        .required('Please select a plan'),

    prices: Yup.number()
        .required('Price is required')
       ,
    users: Yup.number()
        .typeError('Users must be a valid number')
        .required('Number of users is required')
        .min(1, 'There must be at least 1 user')
        .max(100, 'Maximum allowed users is 100'),

    final_price: Yup.number()
});


export const CompanyDetailsValSchema = Yup.object().shape({
  working: Yup.array()
      .of(Yup.string())
      .test('non-empty', 'At least one field must be selected', value => value && value.length > 0),
  employeeSize: Yup.string().required('Please select the number of employees'),
  wfhPolicy: Yup.string().required('Please select a WFH policy'),
});
