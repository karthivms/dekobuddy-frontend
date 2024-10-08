'use client'

import { changeStep } from '@/app/redux/checkoutslice';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

interface Props {
    setedit: () => void;
    page: string
}

const AddressForm: React.FC<Props> = ({ setedit, page }) => {

    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        mobileNumber: '',
        pincode: '',
        locality: '',
        address: '',
        city: '',
        state: '',
        landmark: '',
        alternatePhone: '',
        addressType: 'home',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
    };

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

            <div className="form-row">
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

                <div className="form-group">
                    <input
                        type="text"
                        name="locality"
                        value={formData.locality}
                        placeholder='Locality'
                        onChange={handleChange}
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
                    <select name="state" value={formData.state} onChange={handleChange} required>
                        <option value="" disabled>Select State</option>
                        <option value="state1">State 1</option>
                        <option value="state2">State 2</option>
                        <option value="state3">State 3</option>
                        {/* Add more states as needed */}
                    </select>
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

            <div className="form-group">
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
            </div>
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
