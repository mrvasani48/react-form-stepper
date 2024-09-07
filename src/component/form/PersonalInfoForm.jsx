import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@mantine/core';
import TextInput from '../common/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { SET_NEXT_STEP, SET_PERSONAL_INFO } from '../../redux/reducers/auth.reducer';
import { useEffect } from 'react';


export const initialValuesSchema = {
  firstName: '',
  lastName: '',
  email: '',
  companyName: '',
  companyWebsite: '',
  state: '',
  zipCode: ''
};
const PersonalInfoSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  companyName: Yup.string().required('Company Name is required'),
  zipCode: Yup.string().required('Zip Code is required').max(6, 'Maximum 6 chareacter alllowed'),
});
const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const { personalInfo } = useSelector(store => store.auth)

  const methods = useForm({
    mode: 'onBlur',
    initialValues: personalInfo ?? initialValuesSchema,
    resolver: yupResolver(PersonalInfoSchema)
  });
  const { handleSubmit, reset } = methods;

  const { current_step } = useSelector(store => store.auth);
  const onSubmit = (values) => {
    dispatch(SET_PERSONAL_INFO(values));
    dispatch(SET_NEXT_STEP(current_step < 3 ? current_step + 1 : current_step))
  }
  useEffect(() => {
    if (personalInfo) {
      reset(personalInfo)
    }
  }, [personalInfo])
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='m-5'>
        <div className='grid grid-cols-1 gap-5 '>
          <TextInput
            type="text"
            name="firstName"
            label="firstName"
            props={{
              withAsterisk: true
            }} />
          <TextInput
            type="text"
            name="lastName"
            label="lastName"
            props={{
              withAsterisk: true
            }} />
          <TextInput
            type="email"
            name="email"
            label="email"
            props={{
              withAsterisk: true
            }} />  <TextInput
            type="text"
            name="companyName"
            label="companyName"
            props={{
              withAsterisk: true
            }} />
          <TextInput
            type="text"
            name="zipCode"
            label="zipCode"
            props={{
              withAsterisk: true
            }} />
        </div>
        <div className='mt-5'>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </FormProvider>
  );
};

export default PersonalInfoForm