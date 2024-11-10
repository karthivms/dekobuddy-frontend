'use client'

import { GetCountries } from '@/app/api/countries';
import { GetState } from '@/app/api/states';
import { changeStep, fetchAddress } from '@/app/redux/checkoutslice';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from './selectItem';
import { AddAddress } from '@/app/api/addAddress';
import { AppDispatch } from '@/app/redux/store';
import Toaster from './toaster';

interface Props {
    setedit: () => void;
    page: string;
    userid: string,
}

const AddressForm: React.FC<Props> = ({ setedit, page, userid }) => {

    const dispatch: AppDispatch = useDispatch();
    const [country, setCountry] = useState([])

    const [state, setState] = useState([]);
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false)
    }

    const [formData, setFormData] = useState({
        first_name: '',
        mobileNumber: '',
        email : '',
        pincode: '',
        country: '',
        address: '',
        city: '',
        state: '',
        landmark: '',
        alternatePhone: '',
        user: Number(userid)
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();



        const response = await AddAddress(formData);
        console.log(response)

        setFormData({
            first_name: '',
            mobileNumber: '',
            email : '',
            pincode: '',
            country: '',
            address: '',
            city: '',
            state: '',
            landmark: '',
            alternatePhone: '',
            user: Number(userid)
        })

        setShow(true)
        dispatch(fetchAddress(Number(userid)))
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

    return (
        <form className="address-form wc-70" onSubmit={handleSubmit}>
            <div className="form-row">
                <div className="form-group">

                    <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
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

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Email'
                    required
                />
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
                    <Select value={formData.country} data={country} handlechange={handleChange} type={'country'} />
                </div>

                <div className="form-group">
                    <Select value={formData.state} data={state} handlechange={handleChange} type={'state'} />

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
            <div className='d-flex align-items-center mt-3 gap-20 flex-wrap'>
                <button className="btn1 py-1 br-0 px-4 d-block  font-primary fw-3 text-uppercase" type="submit" onClick={() => dispatch(changeStep(3))}>
                    {page === "checkout" ? (<>Save And Deliver here</>) : (<>Save</>)}
                </button>

                <span className="btn2  br-0 py-1 px-4  font-primary fw-3 text-uppercase pointer" onClick={() => setedit()}>
                    Cancel
                </span>
            </div>
            <Toaster msg={'Address Added Successfully'} show={show} handleClose={handleClose} />
        </form>
    );
};

export default AddressForm;
