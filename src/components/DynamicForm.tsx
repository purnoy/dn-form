'use client';

import {useForm} from 'react-hook-form'; 
interface formData {
    fullName: string;
    email: string;
    contactPreference: 'email' | 'phone' | 'noPreference';
    addressLine1: string;
    addressLine2: string;
    city: string;
    zipCode: string;
    state: string;
    country: string;
}

const DynamicForm = () => {
    const { register, handleSubmit } = useForm<formData>();
    const onSubmit = (data: formData) => {
    console.log(data);
  };
  return (
    <div className='border p-6 mt-6 rounded-lg w-[600px]'>
        <h1 className='text-center mb-4 font-bold'>Dynamic Form</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col mb-2'>
            <label className='font-semibold' htmlFor="fullName">Full Name:</label>
            <input type="text" id="fullName" {...register('fullName')}  className='border rounded-lg p-2'/>
        </div>
        <div className='flex flex-col mb-2'>
            <label className='font-semibold' htmlFor="email">Email Address:</label>
            <input type="email" id="email" {...register('email')} className='border rounded-lg p-2' />
        </div>
        <div className='flex flex-col mb-2'>
            <label className='font-semibold'> Contact Preference:</label>
            <div>
                <label className='me-4'>
                    <input type="radio" value="email" {...register('contactPreference')} className='me-2' />
                    Email
                </label>
                <label className='me-4'>
                    <input type="radio" value="phone" {...register('contactPreference')} className='me-2' />
                    Phone
                </label>
                <label className='me-4'>
                    <input type="radio" value="noPreference" {...register('contactPreference')} className='me-2' />
                    No Preference
                </label>
            </div>
        </div>
        <div className='flex flex-col mb-2'>
            <label htmlFor="addressLine1">Address Line 1</label>
            <input type="text" id="addressLine1" {...register('addressLine1')} className='border rounded-lg p-2' />
        </div>
        <div className='flex flex-col mb-2'>
            <label htmlFor="addressLine2">Address Line 2</label>
            <input type="text" id="addressLine2" {...register('addressLine2')} className='border rounded-lg p-2' />
        </div>
        <div className='mb-2'>
            <label className='me-4'  htmlFor="city">City:</label>
            <input type="text" id="city" {...register('city')} className='border rounded-lg p-2'/>
        </div>
        <div className='mb-2'>
            <label className='me-4' htmlFor="zipCode">Zip Code</label>
            <input type="text" id="zipCode" {...register('zipCode')} className='border rounded-lg p-2' />
        </div>
        <div className='mb-2'>
            <label className='me-4' htmlFor="state">State:</label>
            <select id="state" {...register('state')}  className='bg-white p-2 border'>
                <option value="state1">State 1</option>
                <option value="state2">State 2</option>
            </select>
        </div>
        <div className='mb-2'>
            <label className='me-4' htmlFor="country">Country:</label>
            <select id="country" {...register('country')} className='bg-white p-2 border'>
                <option value="country1">Country 1</option>
                <option value="country2">Country 2</option>
            </select>
        </div>
        <button type="submit" className='bg-blue-500 px-4 py-2 text-white shadow-lg rounded-lg'>Submit</button>
      </form>
    </div>
  )
}

export default DynamicForm