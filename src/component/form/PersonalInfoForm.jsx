import { useDispatch, useSelector } from 'react-redux';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from '@mantine/core';
import TextInput from '../common/TextInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { SET_NEXT_STEP, SET_PERSONAL_INFO } from '../../redux/reducers/emp.reducer';
import { useEffect } from 'react';
import { PersonalInfoSchema } from '../../Schema/formSchema';
import { personalInfoInitialState, statesList } from '../../utils/constant';
import SelectInput from '../common/SelectInput';



const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const { personalInfo } = useSelector(store => store.emp)

  const methods = useForm({
    mode: 'onBlur',
    initialValues: personalInfo ?? personalInfoInitialState,
    resolver: yupResolver(PersonalInfoSchema)
  });
  const { handleSubmit, reset } = methods;

  const { current_step } = useSelector(store => store.emp);
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
      <form onSubmit={handleSubmit(onSubmit)} className='my-5 '>
        <div className='grid grid-cols-1 gap-5 '>
          <TextInput
            name="firstName"
            label="First Name"
            placeholder='Enter First Name'
            props={{
              withAsterisk: true
            }} />
          <TextInput
            name="lastName"
            label="Last name"
            placeholder='Enter Last Name'
            props={{
              withAsterisk: true
            }} />
          <TextInput
            type="email"
            name="email"
            label="Email"
            placeholder='Enter Email'
            props={{
              withAsterisk: true
            }} />
          <TextInput
            name="companyName"
            label="Company Name"
            placeholder='Enter Company Name'
            props={{
              withAsterisk: true
            }} />
          <TextInput
            name="companyWebsite"
            label="Company Website"
            placeholder='Enter Company Website'
            props={{
              withAsterisk: true
            }}
          />
          <SelectInput name='state' label='State' placeholder='Select State' data={statesList} />

          <TextInput
            name="zipCode"
            label="Zip Code"
            placeholder='Enter Zip Code'
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