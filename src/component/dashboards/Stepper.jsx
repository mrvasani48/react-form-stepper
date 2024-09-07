import { Button, Stepper } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import PersonalInfoForm from '../form/PersonalInfoForm';
import CompanyForm from '../form/CompanyForm';
import PlanDetailsFrom from '../form/PlanDetailsFrom';
import DisplayFormData from './DisplayFormData';
import { RESET_STORE } from '../../redux/reducers/auth.reducer';

const StepperComponent = () => {
    const {current_step} = useSelector(store=>store.auth);
    const dispatch=useDispatch()
    const onStepClick=(cd)=>{
      console.log({cd})
    }

    const reset=()=>{
     dispatch(RESET_STORE())
    }
  return (
    <div className='m-10'>
      <Stepper active={current_step} onStepClick={onStepClick}  allowNextStepsSelect={false}>
        <Stepper.Step label="" description="Personal Details">
          <PersonalInfoForm />
         </Stepper.Step>
        <Stepper.Step label="" description="Compant Detailas">
        <CompanyForm />
        </Stepper.Step>
        <Stepper.Step label="" description="Select Plan">
           <PlanDetailsFrom />
        </Stepper.Step>
        <Stepper.Completed>
          <DisplayFormData />
         <Button onClick={reset}>Reset form</Button>
        </Stepper.Completed>
      </Stepper>
    </div>
  );
}

export default StepperComponent;