'use client'

import { GetCountries } from '@/app/api/countries';
import { GetState } from '@/app/api/states';
import { changeStep } from '@/app/redux/checkoutslice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from './selectItem';

interface Props {
    setedit: () => void;
    page: string
}

const AddressForm: React.FC<Props> = ({ setedit, page }) => {

    const dispatch = useDispatch();
    const [country, setCountry] = useState([])
    const [state, setState] = useState([])

    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        pincode: '',
        country: '',
        address: '',
        city: '',
        state: '',
        landmark: '',
        alternatePhone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === "mobileNumber" || name === "alternatePhone") {
            if (!/^[\d+\-()\s]*$/.test(value)) {
                return
            }
        }

        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

    useEffect(() => {

        async function getcountry() {
            const response = await GetCountries();
            setCountry(response)
        }
        getcountry()
    }, [])

    useEffect(() => {
        async function getstate() {
            const response = await GetState(formData.country);
            setState(response?.data?.states)
        }
        getstate()

    }, [formData.country])

    console.log(formData)
    return (
        <form className="address-form wc-70" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">

                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        placeholder='Name'
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">

                    <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        placeholder='Mobile Number'
                        required
                    />
                </div>
            </div>



            <div className="form-group full-width">
                <textarea
                    name="address"
                    placeholder='Address (Area and Street)'
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-row">

                <div className="form-group">
                    <Select data={country} handlechange={handleChange} type={'country'}/>

                </div>

                <div className="form-group">
                    <Select data={state} handlechange={handleChange} type={'state'}/>

                </div>
            </div>

            <div className="form-row">
                <div className="form-group">
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        placeholder='City/District/Town'
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        name="pincode"
                        value={formData.pincode}
                        placeholder='Pincode'
                        onChange={handleChange}
                        required
                    />
                </div>


            </div>

            <div className="form-row">
                <div className="form-group">
                    <input
                        type="text"
                        name="landmark"
                        placeholder='Landmark (Optional)'
                        value={formData.landmark}
                        onChange={handleChange}
                    />
                </div>

                <div className="form-group">
                    <input
                        type="tel"
                        name="alternatePhone"
                        value={formData.alternatePhone}
                        onChange={handleChange}
                        placeholder='Alternate Phone (Optional)'
                    />
                </div>
            </div>

            {/* <div className="form-group">
                <p>Address Type</p>
                <div className='d-flex gap-20 mt-2 flex-wrap row-gap-20 align-items-center'>
                    <label className='d-flex gap-10  align-items-center'>
                        <input
                            type="radio"
                            name="addressType"
                            value="home"
                            checked={formData.addressType === 'home'}
                            onChange={handleChange}
                        />
                        <span> Home (All day delivery)</span>
                    </label>
                    <label className='d-flex gap-10 align-items-center'>
                        <input
                            type="radio"
                            name="addressType"
                            value="work"
                            checked={formData.addressType === 'work'}
                            onChange={handleChange}
                        />
                        Work (Delivery between 10 am to 5 pm)
                    </label>
                </div>
            </div> */}
            <div className='d-flex gap-20 flex-wrap'>
                {page === "checkout" ? (<button className="btn1 h-35 br-0 px-4 mt-3 d-block  font-primary fw-3 text-uppercase" type="submit" onClick={() => dispatch(changeStep(3))}>
                    Save And Deliver here
                </button>) : (<button className="btn1 h-35 br-0 px-4 mt-3 d-block  font-primary fw-3 text-uppercase" type="submit" onClick={() => dispatch(changeStep(3))}>
                    Save
                </button>)}

                <button className="btn2 h-35 br-0 px-4 mt-3 d-block font-primary fw-3 text-uppercase" onClick={() => setedit()}>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default AddressForm;
