import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { SET_PLANE_DETAILS, SET_NEXT_STEP, SET_PREV_STEP } from '../../redux/reducers/emp.reducer';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mantine/core';
import DateTimePickerInput from '../common/DateTimePickerInput';
import SelectInput from '../common/SelectInput';
import TextInput from '../common/TextInput';
import { PlanDetailsValSchema } from '../../Schema/formSchema';
import { planDetailsInitialValue, plans } from '../../utils/constant';


const PlanDetailsFrom = () => {
   
    const dispatch = useDispatch()
    const { planDetails, current_step } = useSelector(store => store.emp)
    const methods = useForm({
        mode: 'onBlur',
        initialValues: planDetails ?? planDetailsInitialValue,
        resolver: yupResolver(PlanDetailsValSchema),
    })
    const { handleSubmit, reset, watch, setValue} = methods

    const onSubmitHandler = (values) => {
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

    useEffect(() => {
        if (plansValue) {
            const planPriceArray = plans.filter(item => item.value === plansValue);
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
        <div className='my-5'>
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmitHandler)}>
                    <div className='grid grid-cols-1 gap-5 '>
                        <DateTimePickerInput name='startDate' label='Start Date' placeholder='Select Start Date' />
                        <div className='grid grid-cols-2 gap-5'>
                            <div className='flex flex-col gap-3'>
                                <SelectInput name='plans' label='Plans' placeholder='Select Plans' data={plans} />
                                <TextInput name='prices' label='Price' disabled={true} />
                                <TextInput name='users' label='Users' type='number' />
                            </div>
                            {plansValue ? <div className="flex flex-col gap-4 mt-4">
                                <h3 className="text-xl font-bold">Order Summary</h3>
                                <table className="min-w-full bg-white border border-gray-200">
                                <thead>
                                    <tr className="border-b bg-gray-100">
                                    <th className="py-2 px-4 text-left">Item</th>
                                    <th className="py-2 px-4 text-left">Details</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b">
                                    <td className="py-2 px-4 font-semibold">Plan</td>
                                    <td className="py-2 px-4">{plansValue}</td>
                                    </tr>
                                    <tr className="border-b">
                                    <td className="py-2 px-4 font-semibold">Price per user</td>
                                    <td className="py-2 px-4">${planPrice || 0}</td>
                                    </tr>
                                    <tr className="border-b">
                                    <td className="py-2 px-4 font-semibold">Number of users</td>
                                    <td className="py-2 px-4">{users}</td>
                                    </tr>
                                    <tr className="border-b">
                                    <td className="py-2 px-4 font-semibold">Total Price</td>
                                    <td className="py-2 px-4">${finalPrice}</td>
                                    </tr>
                                </tbody>
                                </table>
                            </div>
                            :null}
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
