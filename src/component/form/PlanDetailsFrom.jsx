import React from 'react'
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'
import { SET_PLANE_DETAILS, SET_NEXT_STEP, SET_PREV_STEP } from '../../redux/reducers/auth.reducer';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mantine/core';
import DateTimePickerInput from '../common/DateTimePickerInput';
import SelectInput from '../common/SelectInput';
import TextInput from '../common/TextInput';

const initialValuesSchema = {
    startDate: '',
    plans: '',
    prices: true,
    users: 1,
    finale_price: ''
}
const plans = [
    { value: 'monthly-gold', label: 'Monthly Gold', price: 50 },
    { value: 'yearly-gold', label: 'Yearly Gold', price: 100 },
];

const PlanDetailsFrom = () => {
    const validationSchema = Yup.object().shape({
        startDate: Yup.date()
            .required('Start Date is required')
            .nullable() // Ensures date is either null or a valid date
            .typeError('Please enter a valid date'),

        plans: Yup.string()
            .required('Please select a plan'),

        prices: Yup.number()
            .required('Price is required')
            .min(1, 'Price must be at least 1'),

        users: Yup.number()
            .required('Number of users is required')
            .min(1, 'There must be at least 1 user')
            .max(100, 'Maximum allowed users is 100'),

        final_price: Yup.number()
    });

    const dispatch = useDispatch()
    const { planDetails, current_step } = useSelector(store => store.auth)
    const methods = useForm({
        mode: 'onBlur',
        initialValues: planDetails ?? initialValuesSchema,
        resolver: yupResolver(validationSchema),
    })
    const { handleSubmit, reset, watch, setValue,getValues,formState } = methods

    const onSubmitHandler = (values) => {
        console.log('Form Data', values);
        dispatch(SET_PLANE_DETAILS(values))
        dispatch(SET_NEXT_STEP(current_step < 3 ? current_step + 1 : current_step))
    }
    useEffect(() => {
        if (planDetails) {
            reset(planDetails);
        }
    }, [planDetails])
    const plansValue = watch('plans')
    const users = watch('users')
    const planPrice = watch('prices')
    const finalPrice = watch('finalPrice')
console.log(getValues(),formState.errors)
    useEffect(() => {
        if (plansValue) {
            const planPriceArray = plans.filter(item => item.value === plansValue)
            setValue('prices', planPriceArray?.[0]?.price)
        }

    }, [plansValue])

    useEffect(() => {
        if (planPrice && users) {
            setValue('finalPrice', users * planPrice)
        }
    }, [planPrice, users])

    const prev = () => {
        dispatch(SET_PREV_STEP(current_step > 0 ? current_step - 1 : current_step));
    }
    return (
        <div className='m-5'>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className='grid grid-cols-1 gap-5 '>
                        <DateTimePickerInput name='startDate' label='start date' placeholder='select start date' />
                        <div className='grid grid-cols-2 gap-5'>
                            <div>
                                <SelectInput name='plans' label='Plans' placeholder='select plans' data={plans} />
                                <TextInput name='prices' label='price' disabled={true} />
                                <TextInput name='users' label='users' type='number' />
                            </div>
                            <div className='flex flex-col gap-4'>
                                <h3 className="text-xl font-bold">Order Summary</h3>
                                <p><strong>Plan:</strong> {plansValue}</p>
                                <p><strong>Price per user:</strong> ${planPrice || 0}</p>
                                <p><strong>Number of users:</strong> {users}</p>
                                <p><strong>Total Price:</strong> ${finalPrice}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex gap-5 mt-5'>
                        <Button variant="outline" onClick={prev}>Prev</Button>
                        <Button type="submit">Save</Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    )
}

export default PlanDetailsFrom
