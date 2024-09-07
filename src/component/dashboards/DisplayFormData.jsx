import React from 'react';
import { useSelector } from 'react-redux';

// Personal Info Component
const PersonalInfo = ({ data }) => {
    return (
        <div className='mt-5'>
            <h2 className="text-xl font-bold mb-4">Personal Information</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <tbody>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold">First Name</td>
                        <td className="py-2 px-4">{data.firstName}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold">Last Name</td>
                        <td className="py-2 px-4">{data.lastName}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold">Email</td>
                        <td className="py-2 px-4">{data.email}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold">Company Name</td>
                        <td className="py-2 px-4">{data.companyName}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold">Company Website</td>
                        <td className="py-2 px-4">{data.companyWebsite}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold">State</td>
                        <td className="py-2 px-4">{data.state}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold">Zip Code</td>
                        <td className="py-2 px-4">{data.zipCode}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

// Company Details Component
const CompanyDetails = ({ data }) => {
    return (
        <div className='my-5'>
            <h2 className="text-xl font-bold mb-4">Company Details</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <tbody>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold">Working Fields</td>
                        <td className="py-2 px-4">{data.working.join(', ')}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold">Employee Size</td>
                        <td className="py-2 px-4">{data.employeeSize}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold">WFH Policy</td>
                        <td className="py-2 px-4">{data.wfhPolicy === 'true' ? 'Yes' : 'No'}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

// Plan Details Component
const PlanDetails = ({ data }) => {
    return (
        <div >
            <h2 className="text-xl font-bold mb-4">Plan Details</h2>
            <table className="min-w-full bg-white border border-gray-200">
                <tbody>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold">Start Date</td>
                        <td className="py-2 px-4">{data.startDate.toString()}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold">Plan</td>
                        <td className="py-2 px-4">{data.plans}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold">Price</td>
                        <td className="py-2 px-4">${data.prices}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold">Number of Users</td>
                        <td className="py-2 px-4">{data.users}</td>
                    </tr>
                    <tr className="border-b">
                        <td className="py-2 px-4 font-semibold">Final Price</td>
                        <td className="py-2 px-4">${data.finale_price}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const DisplayFormData = () => {
    const { personalInfo, companyDetails, planDetails } = useSelector(store => store.emp);

    return (
        <div className="container mx-auto p-6">
            <PersonalInfo data={personalInfo} />
            <CompanyDetails data={companyDetails} />
            <PlanDetails data={planDetails} />
        </div>
    );
}

export default DisplayFormData;
