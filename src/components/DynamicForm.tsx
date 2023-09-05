'use client';

import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import { useFieldArray, useForm } from 'react-hook-form';
import * as Yup from 'yup';

interface formData {
  fullName: string;
  email: string;
  contactPreference: 'email' | 'phone' | 'noPreference';
  phoneNum?: { number: string }[];
  emailadd?: { exEmail: string }[];
  addressLine1: string;
  addressLine2: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
}

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required('Fullname is Required'),
  email: Yup.string()
    .matches(
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      'Invalid EMail format',
    )
    .email('InvalidEmail format.')
    .required('Email is required'),
  contactPreference: Yup.string().required('Fullname is Required'),
  phoneNum: Yup.array().of(
    Yup.object().shape({
      number: Yup.string(),
    }),
  ),
  emailadd: Yup.array().of(
    Yup.object().shape({
      exEmail: Yup.string(),
    }),
  ),
  addressLine1: Yup.string().required('Address is Required'),
  addressLine2: Yup.string(),
  city: Yup.string()
    .matches(/^[A-Za-z]+$/, 'Give a valid city name')
    .required('City is Required'),
  zipCode: Yup.string()
    .matches(/^[0-9]+$/, 'Write a valid Zip Code')
    .min(5, 'Zip Code must be at least 5 digits.')
    .max(5, 'Zip Code can not be more than 5 digits.'),
  state: Yup.string(),
  country: Yup.string()
    .matches(/^[A-Za-z]+$/, 'Give a valid c name')
    .required('Country is Required'),
});

function DynamicForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<formData>({
    defaultValues: {
      fullName: '',
      email: '',
      contactPreference: 'noPreference',
      phoneNum: [{ number: '0' }],
      emailadd: [{ exEmail: '' }],
      addressLine1: '',
      addressLine2: '',
      city: '',
      zipCode: '',
      state: '',
      country: '',
    },
    resolver: yupResolver(validationSchema),
  });
  const contactPreference = watch('contactPreference');

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    name: 'phoneNum',
    control,
  });

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    name: 'emailadd',
    control,
  });

  const onSubmit = (data: formData) => {
    console.log(data);
  };

  return (
    <div className="border p-6 mt-6 rounded-lg w-[600px] bg-yellow-200">
      <h1 className="text-center mb-4 font-bold text-4xl font-d_s">
        Dynamic Form
      </h1>

      {/* Fullname */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="flex flex-col mb-2">
          <label className="font-semibold" htmlFor="fullName">
            Full Name:
            <input
              type="text"
              id="fullName"
              {...register('fullName', {
                required: {
                  value: true,
                  message: 'Full name is required',
                },
                validate: {
                  noAdmin: (fieldValue) =>
                    fieldValue !== 'Purnoy' || 'This name is not Allowed',
                },
              })}
              className="border rounded-lg p-2 ms-2"
            />
            <ErrorMessage
              errors={errors}
              name="fullName"
              render={(m) => <p className="text-red-700">{m.message}</p>}
            />
          </label>
        </div>

        {/* Email Address */}
        <div className="flex flex-col mb-2">
          <label className="font-semibold" htmlFor="email">
            Email Address:
            <input
              type="email"
              id="email"
              {...register('email', {
                pattern: {
                  value:
                    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  message: 'Invalid Email Format',
                },
                validate: {
                  noAdminEmail: (fieldValue) =>
                    fieldValue !== 'purnoy.xyz@gmail.com' ||
                    'This Email is not Allowed',

                  blackListed: (fieldValue) =>
                    !fieldValue.endsWith('gmail.com') ||
                    'This domain is not allowed',
                },
              })}
              className="border rounded-lg p-2 ms-2"
            />
            <ErrorMessage
              errors={errors}
              name="email"
              render={(m) => <p className="text-red-700">{m.message}</p>}
            />
          </label>
        </div>

        {/* Contact Preference  */}
        <div className="flex flex-col mb-2">
          <label className="font-semibold" htmlFor="contactPreference">
            Contact Preference:
            <div>
              <label className="me-4" htmlFor="email">
                <input
                  type="radio"
                  value="email"
                  id="email"
                  {...register('contactPreference')}
                  className="me-2"
                />
                Email
              </label>
              <label className="me-4" htmlFor="phone">
                <input
                  type="radio"
                  value="phone"
                  id="phone"
                  {...register('contactPreference')}
                  className="me-2"
                />
                Phone
              </label>
              <label className="me-4" htmlFor="noPreference">
                <input
                  type="radio"
                  value="noPreference"
                  id="noPreference"
                  {...register('contactPreference')}
                  className="me-2"
                />
                No Preference
              </label>
            </div>
          </label>
        </div>
        {contactPreference === 'email' && (
          <div className="flex flex-col mb-2">
            <label className="font-semibold" htmlFor="emailadd">
              Email:
              <div className="">
                {emailFields.map((field, index) => (
                  <div className="flex gap-x-6" key={field.id}>
                    <input
                      className="border rounded-lg p-2 mb-2"
                      type="email"
                      id="emailadd"
                      {...register(`emailadd.${index}.exEmail`, {
                        pattern: {
                          value:
                            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          message: 'Invalid Email Format',
                        },
                        validate: {
                          noAdminEmail: (fieldValue) =>
                            fieldValue !== 'purnoy@xyz.com' ||
                            'This Email is not Allowed',
                          blackListed: (fieldValue) =>
                            !fieldValue.endsWith('gmail.com') ||
                            'This domain is not allowed',
                        },
                      })}
                    />

                    {index > 0 && (
                      <button
                        className="bg-blue-500 mt-2 px-4 py-2 text-white shadow-lg rounded-lg"
                        type="button"
                        onClick={() => removeEmail(index)}
                      >
                        Remove Email
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="bg-blue-500 mt-4 px-4 py-2 text-white shadow-lg rounded-lg"
                  type="button"
                  onClick={() => appendEmail({ exEmail: '' })}
                >
                  Add Extra Email
                </button>
              </div>
            </label>
          </div>
        )}
        <ErrorMessage
          errors={errors}
          name="exEmail"
          render={(m) => <p className="text-red-700">{m.message}</p>}
        />
        {contactPreference === 'phone' && (
          <div className="flex flex-col mb-2">
            <label className="font-semibold" htmlFor="phoneNum">
              Phone:
              <div className="">
                {phoneFields.map((field, index) => (
                  <div className=" flex gap-x-6" key={field.id}>
                    <input
                      className="border rounded-lg p-2 mb-2"
                      type="text"
                      id="phoneNum"
                      {...register(`phoneNum.${index}.number` as const, {
                        valueAsNumber: true,
                        minLength: 11,
                        maxLength: 11,
                      })}
                    />
                    {index > 0 && (
                      <button
                        className="bg-blue-500 mt-4 px-4 py-2 text-white shadow-lg rounded-lg"
                        type="button"
                        onClick={() => removePhone(index)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="bg-blue-500 mt-4 px-4 py-2 text-white shadow-lg rounded-lg"
                  type="button"
                  onClick={() => appendPhone({ number: '' })}
                >
                  Add Extra Phone
                </button>
              </div>
            </label>
          </div>
        )}

        <div className="flex flex-col mb-2">
          <label htmlFor="addressLine1">
            Address Line 1:
            <input
              className="border rounded-lg p-2 ms-2"
              type="text"
              id="addressLine1"
              {...register('addressLine1')}
            />
            <ErrorMessage
              errors={errors}
              name="addressLine1"
              render={({ message }) => (
                <p className="text-red-700">{message}</p>
              )}
            />
          </label>
        </div>

        <div className="font-lato flex flex-col mb-2">
          <label htmlFor="addressLine2">
            Address Line 2:
            <input
              type="text"
              id="addressLine2"
              {...register('addressLine2')}
              className="border rounded-lg p-2 ms-2"
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="me-4" htmlFor="city">
            City:
            <input
              type="text"
              id="city"
              {...register('city')}
              className="border rounded-lg p-2 ms-2"
            />
            <ErrorMessage
              errors={errors}
              name="city"
              render={({ message }) => (
                <p className="text-red-700">{message}</p>
              )}
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="me-4" htmlFor="zipCode">
            Zip Code:
            <input
              type="text"
              id="zipCode"
              {...register('zipCode')}
              className="border rounded-lg p-2 ms-2"
            />
            <ErrorMessage
              errors={errors}
              name="zipCode"
              render={({ message }) => (
                <p className="text-red-700">{message}</p>
              )}
            />
          </label>
        </div>
        <div className="mb-2">
          <label className="me-4" htmlFor="state">
            State:
            <select
              id="state"
              placeholder="USA Only"
              {...register('state', {
                disabled: watch('country') !== 'USA',
              })}
              className="p-2 border ms-2"
            >
              <option value="state1">State 1</option>
              <option value="state2">State 2</option>
            </select>
            <ErrorMessage
              errors={errors}
              name="state"
              render={({ message }) => (
                <p className="text-red-700">{message}</p>
              )}
            />
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="country">
            Country:
            <select
              id="country"
              {...register('country')}
              className="bg-white p-2 border ms-2"
            >
              <option value="USA">USA</option>
              <option value="Bangladesh">Bangladesh</option>
            </select>
            <ErrorMessage
              errors={errors}
              name="country"
              render={({ message }) => (
                <p className="text-red-700">{message}</p>
              )}
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-blue-500 mt-4 px-4 py-2 text-white shadow-lg rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default DynamicForm;
