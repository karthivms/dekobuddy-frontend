import { Container } from "react-bootstrap";
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: '',
}

export default function Page() {
    return (
        <Container className='my-sm-3  px-3 py-4 '>
            <h1 className="font-h2 text-theme1 fw-4 mb-3">Privacy Policy</h1>
            <p className="text-justify line-relaxed text-black">
                At DEKOBUDDY RUGS, your privacy is our priority. We want to ensure you understand how we collect, use,
                and protect your personal information so we can provide the best possible service to you. Please take a
                moment to read through our Privacy Policy.
            </p>


            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3"> How We Collect and Use Your Information </h3>
            <p> We collect personal information when you interact with DEKOBUDDY RUGS. This may include making a
                purchase, signing up for an account, or subscribing to our newsletter. The information we collect helps us
                serve you better by offering you tailored products, services, and communication.</p>


            <p> We may use your information to send you updates about new products, promotions, or special offers that
                we believe may interest you. Occasionally, we may also reach out to ask you to participate in surveys,
                helping us improve our products and customer experience.</p>

            <p> If at any point you prefer not to receive marketing emails or other communications, you can easily
                unsubscribe by following the instructions in our emails or by contacting us directly at
                support@dekobuddy.in.</p>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">How We Store and Manage Your Information</h3>
            <p>When you visit our website, we collect some personal details like your name, phone number, email address, and sometimes payment information. This information is stored securely to help us process your orders efficiently and improve your experience with us.</p>
            <p>For your convenience, we offer you the option to create an account. This allows you to manage your orders, preferences, and updates in one place. You can update or correct your details at any time by logging into your account or by reaching out to us at <a href="mailto:support@dekobuddy.in">support@dekobuddy.in</a>.</p>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">Sharing Your Information with Trusted Partners</h3>
            <p>To provide you with the best service, we may need to share some of your information with trusted third parties, such as delivery companies, to ensure your products reach you promptly. We do not sell, rent, or trade your personal details to anyone else.</p>
            <p>In the event of a merger, acquisition, or sale of our business, your personal information may be transferred to the new entity, but it will still be protected under this Privacy Policy.</p>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">Legal Requirements</h3>
            <p>Sometimes, we may be required by law to share your information with authorities or other third parties. We take your privacy seriously and will only share information when necessary and in accordance with applicable laws.</p>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">Protecting Your Information</h3>
            <p>While we take all reasonable steps to protect your personal information, it&#39;s important to remember that no system is completely secure. We encourage you to take precautions when using the internet, like using strong passwords and keeping your login details safe.</p>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">Cookies and Tracking</h3>
            <p>To help us improve your experience on our website, we use cookies to track browsing activity, such as the pages you visit and how long you stay on our site. These cookies do not contain any personal information but help us understand how we can enhance our website’s features.</p>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">Children&#39;s Privacy</h3>
            <p>DEKOBUDDY RUGS does not knowingly collect information from anyone under the age of 18. If you are under 18, please refrain from sharing personal information with us. We recommend that parents supervise their children&#39;s online activities and ensure their safety while browsing the web.</p>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">Changes to This Policy</h3>
            <p>We may update this Privacy Policy from time to time. We encourage you to review this page periodically for any changes. If you have any questions or concerns about your privacy or our policy, please feel free to contact us at <a href="mailto:support@dekobuddy.in">support@dekobuddy.in</a>.</p>

        </Container>);
}