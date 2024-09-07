import React from 'react';
import { useSelector } from 'react-redux';


// Personal Info Component
const PersonalInfo = ({ data }) => {
    return (
        <div>
            <h2>Personal Information</h2>
            <p>First Name: {data.firstName}</p>
            <p>Last Name: {data.lastName}</p>
            <p>Email: {data.email}</p>
            <p>Company Name: {data.companyName}</p>
            <p>Company Website: {data.companyWebsite}</p>
            <p>State: {data.state}</p>
            <p>Zip Code: {data.zipCode}</p>
        </div>
    );
};

// Company Details Component
const CompanyDetails = ({ data }) => {
    return (
        <div>
            <h2>Company Details</h2>
            <p>Working Fields: {data.working.join(', ')}</p>
            <p>Employee Size: {data.employeeSize}</p>
            <p>WFH Policy: {data.wfhPolicy === 'true' ? 'Yes' : 'No'}</p>
        </div>
    );
};

// Plan Details Component
const PlanDetails = ({ data }) => {
    return (
        <div>
            <h2>Plan Details</h2>
            <p>Start Date: {data.startDate.toString()}</p>
            <p>Plan: {data.plans}</p>
            <p>Price: ${data.prices}</p>
            <p>Number of Users: {data.users}</p>
            <p>Final Price: ${data.finale_price}</p>
        </div>
    );
};

const DisplayFormData = () => {
    const { personalInfo, companyDetails, planDetails } = useSelector(store => store.auth);

    return (
        <div className="container mx-auto p-6">
            <PersonalInfo data={personalInfo} />
            <CompanyDetails data={companyDetails} />
            <PlanDetails data={planDetails} />
        </div>
    )
}
export default DisplayFormData