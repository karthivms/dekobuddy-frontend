'use client'

import React, { useState } from 'react';



const ContactForm = () => {


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        PhoneNumber: '',
        Message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
                        name="PhoneNumber"
                        value={formData.PhoneNumber}
                        placeholder='Phone Number'
                        onChange={handleChange}
                        required
                    />
                </div>

               

            <div className="form-group full-width">
                <textarea
                    name="Message"
                    placeholder='Message'
                    value={formData.Message}
                    onChange={handleChange}
                    required
                />
            </div>



            <button className="btn1 h-35 px-4 mt-1 d-block font-primary fw-3 text-uppercase" >
                Send Message
            </button>
        </form>
    );
};

export default ContactForm;
