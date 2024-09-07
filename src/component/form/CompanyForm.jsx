import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { SET_COMPANY_DETAILS, SET_NEXT_STEP, SET_PREV_STEP } from '../../redux/reducers/emp.reducer';
import RadioGroupInput from '../common/RadioGroupInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mantine/core';
import SelectInput from '../common/SelectInput';
import CheckboxInput from '../common/CheckboxInput';
import { companyDetailsInitialState, EMPLOYEE_OPTIONS, WORKING_ON } from '../../utils/constant';
import { CompanyDetailsValSchema } from '../../Schema/formSchema';


const CompanyForm = () => {
  
    const dispatch = useDispatch()
    const { companyDetails, current_step } = useSelector(store => store.emp)
    const methods = useForm({
        mode: 'onBlur',
        initialValues: companyDetails ?? companyDetailsInitialState,
        resolver: yupResolver(CompanyDetailsValSchema),
    })
    const { handleSubmit, reset } = methods

    const onSubmitHandler = (values) => {
        dispatch(SET_COMPANY_DETAILS(values))
        dispatch(SET_NEXT_STEP(current_step < 3 ? current_step + 1 : current_step))
    }
    useEffect(() => {
        if (companyDetails) {
            reset(companyDetails);
        }
    }, [companyDetails])

    const prev = () => {
        dispatch(SET_PREV_STEP(current_step > 0 ? current_step - 1 : current_step));
    }
    return (
        <div className='my-5'>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className='grid grid-cols-1 gap-5 '>
                        <CheckboxInput label='Company Working On' name='working' options={WORKING_ON} />
                        <SelectInput name='employeeSize' label='Company Size' placeholder='Select Company Size' data={EMPLOYEE_OPTIONS} />
                        <RadioGroupInput name='wfhPolicy' label='Does the company have a WFH policy?' options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'No' }]} />
                    </div>
                    <div className='flex gap-5 mt-5'>
                        <Button variant="outline" onClick={prev}>Prev</Button>
                        <Button type="submit">Next</Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default CompanyForm
