import { Container } from "react-bootstrap";


import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Warranty Conditions',
    description: '',
}

export default function Page() {
    return (
        <Container className='my-sm-3  px-3 py-4 '>
            <h1 className="font-h2 text-theme1 fw-4 mb-3"> Warranty Conditions</h1>
            <p className="text-justify line-relaxed text-black">
                At DEKOBUDDY, we take pride in the craftsmanship and quality of our rugs. Each piece is created with care and precision to ensure it meets the highest standards. To give you confidence in your purchase, our rugs come with a product warranty covering manufacturing defects for a specified period based on the construction type.
            </p>
            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">Warranty Coverage</h3>
            <p className="text-justify line-relaxed text-black">
                Our warranty offers coverage for various rug types, with durations tailored to the weave:
            </p>

            <table className="table table-bordered">
                <thead >
                    <tr >
                        <th className="bg-transparent">Weave Type</th>
                        <th className="bg-transparent">Warranty Period</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="bg-transparent">Hand-Knotted, Tibetan (Indo-Nepali)</td>
                        <td className="bg-transparent">24 Months</td>
                    </tr>
                    <tr>
                        <td className="bg-transparent">Hand-Tufted, Handloom, Flat Weave, Shags, Hand-Woven</td>
                        <td className="bg-transparent">12 Months</td>
                    </tr>
                </tbody>
            </table>
            <p className="text-justify line-relaxed text-black">If you encounter a manufacturing defect within the warranty period, our team is ready to assist you. Simply notify us by email at <a href="mailto:support@dekobuddy.in">support@dekobuddy.in</a> or call +91 8707487711. Please include three clear images of the damaged rug. If the issue falls under our warranty policy, we will provide the best possible resolution.</p>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">How to Claim Your Warranty?</h3>
            <ol className="flex-column d-flex row-gap-10">
                <li><strong>Notification:</strong> Contact us at <a href="mailto:support@dekobuddy.in">support@dekobuddy.in</a> or +91 8707487711, providing detailed images of the damaged rug/carpet and a description of the issue.</li>
                <li><strong>Assessment:</strong> Our team will review your claim to determine if the defect is covered under the warranty.</li>
                <li><strong>Resolution:</strong> If covered, we will offer a resolution, such as repair or replacement, ensuring you&apos;re satisfied with the outcome.</li>
                <li><strong>Proof of Purchase:</strong> Retain the original proof of purchase, as warranties are valid only for the original purchaser and are non-transferable.</li>
            </ol>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">Terms and Conditions</h3>
            <ul className="flex-column d-flex row-gap-10">
                <li><strong>Logistics Charges:</strong> Customers are responsible for logistics charges. DEKOBUDDY can arrange pickup and delivery for added convenience.</li>
                <li><strong>Warranty Period:</strong> Replacement rugs under warranty will carry the remaining warranty period from the original purchase date.</li>
                <li><strong>Non-Transferable:</strong> Warranty coverage applies only to the original purchaser.</li>
            </ul>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">Exclusions from Warranty</h3>
            <ul className="flex-column d-flex row-gap-10">
                <li><strong>Shedding:</strong> Regular vacuuming in low-power mode minimizes shedding.</li>
                <li><strong>Sprouting or Pulls:</strong> These are natural and not considered defects.</li>
                <li><strong>Color and Texture Changes:</strong> Variations due to natural fibres, dyes, sunlight, or atmospheric conditions are excluded.</li>
                <li><strong>Rolling Marks:</strong> Temporary marks disappear with regular vacuuming.</li>
                <li><strong>Matting and Crushing:</strong> Routine maintenance helps prevent these issues.</li>
                <li><strong>Odour:</strong> New rugs may emit a scent that fades when aired in direct sunlight for 24 hours.</li>
            </ul>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">Why Choose DEKOBUDDY Rugs?</h3>
            <ul className="flex-column d-flex row-gap-10">
                <li><strong>Exceptional Quality:</strong> Our rugs undergo rigorous quality checks to ensure excellence.</li>
                <li><strong>Dedicated Support:</strong> Our team is always available to address your concerns.</li>
                <li><strong>Expert Craftsmanship:</strong> Crafted by skilled artisans, our rugs are designed to last and elevate your spaces.</li>
            </ul>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">Contact Us</h3>
            <p className="text-justify line-relaxed text-black">For more details about our rug warranty or to file a claim, reach out to us at <a href="mailto:support@dekobuddy.in" className="text-theme1">support@dekobuddy.in</a> or call <a href="tel:+918707487711" className="text-theme1">+91 8707487711.</a> </p>
            <p className="text-justify line-relaxed text-black">At DEKOBUDDY, your satisfaction is our top priority. We are here to ensure your experience with our rugs is nothing short of extraordinary.</p>

        </Container>);
}