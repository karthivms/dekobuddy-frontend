'use client'

import { Enquire } from '@/app/api/contactForm';
import React, { useState } from 'react';



const ContactForm = () => {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const [msg, setMsg] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        const phoneRegex = /^[0-9+\s-]*$/;

        if (name === 'phone' && !phoneRegex.test(value)) {
            return;
        }
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();


        const response = await Enquire(formData)
        if (response.status) {
            setFormData({
                name: '',
                email: '',
                phone: '',
                message: ''
            })
            setMsg('Your message has been sent. we will get back to you shortly')
        }
    };

    return (
        <form className="contact-form wc-70" onSubmit={handleSubmit}>
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
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder='Email'
                        required
                    />
                </div>
            </div>

            <div className="form-group full-width">
                <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    placeholder='Phone Number'
                    onChange={handleChange}
                    required
                />
            </div>



            <div className="form-group full-width">
                <textarea
                    name="message"
                    placeholder='Message'
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
            </div>


            {msg && <p className='text-success mb-0 text-center'>{msg}</p>}
            <button className="btn1 h-35 px-4 mt-1 d-block font-primary fw-3 text-uppercase" >
                Enquire Now
            </button>
        </form>
    );
};

export default ContactForm;
