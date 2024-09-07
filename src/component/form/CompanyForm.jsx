import React from 'react'
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'
import { SET_COMPANY_DETAILS, SET_NEXT_STEP, SET_PREV_STEP } from '../../redux/reducers/auth.reducer';
import RadioGroupInput from '../common/RadioGroupInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mantine/core';
import SelectInput from '../common/SelectInput';
import CheckboxInput from '../common/CheckboxInput';

const WORKING_ON = [
    { value: 'tech', label: 'Technology' },
    { value: 'finance', label: 'Finance' },
    { value: 'health', label: 'Health' },
    { value: 'education', label: 'Education' },
];
const EMPLOYE_OPTIONS = [
    { value: '1-10', label: '1-10' },
    { value: '10-20', label: '10-20' },
    { value: '20-30', label: '20-30' },
    { value: '40+', label: '40+' },
]
const initialValuesSchema = {
    working: [],
    employeeSize: '',
    wfhPolicy: true,
}
const CompanyForm = () => {
    // Define Yup Validation Schema
    const validationSchema = Yup.object().shape({
        working: Yup.array()
            .of(Yup.string())
            .test('non-empty', 'At least one field must be selected', value => value && value.length > 0),
        employeeSize: Yup.string().required('Please select the number of employees'),
        wfhPolicy: Yup.string().required('Please select a WFH policy'),
    });

    const dispatch = useDispatch()
    const { companyDetails, current_step } = useSelector(store => store.auth)
    const methods = useForm({
        mode: 'onBlur',
        initialValues: companyDetails ?? initialValuesSchema,
        resolver: yupResolver(validationSchema),
    })
    const { handleSubmit, reset, getValues } = methods

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
        <div className='m-5'>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className='grid grid-cols-1 gap-5 m-5'>
                        <CheckboxInput name='working' label='working' options={WORKING_ON} />
                        <SelectInput name='employeeSize' label='Company Size' placeholder='Select Company Size' data={EMPLOYE_OPTIONS} />
                        <RadioGroupInput name='wfhPolicy' label='Does the company have a WFH policy?' options={[{ value: 'true', label: 'Yes' }, { value: 'false', label: 'Noo' }]} />
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
