import { Container } from "react-bootstrap";

export default function Page() {
    return (
        <Container className='my-sm-3  px-3 py-4 '>
            <h1 className="font-h2 text-theme1 fw-4 mb-3">Terms and Conditions</h1>
            <p className="text-justify line-relaxed text-black">
                Welcome to Dekobuddy Rugs, where sophistication meets comfort.
                We are committed to providing you with the finest rugs, crafted to enhance the beauty of your home.
                By shopping with us, you are agreeing to the following terms and conditions.
                Please take a moment to read them carefully.
            </p>


            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">1. Product Exchange Policy</h3>
            <p>At Dekobuddy Rugs, we understand that perfection is in the details. Should you wish to exchange your rug, we are pleased to offer the following policy:</p>
            <ul className="flex-column d-flex row-gap-10" >
                <li><strong >15-Day Exchange Window:</strong> You have 15 days from the date of purchase to request an exchange.</li>
                <li><strong >Uncompromising Quality:</strong> To ensure the highest standards, products must be returned in pristine condition, unused, and in their original packaging.</li>
                <li><strong >Seamless Process:</strong> Exchanges can be made for rugs of equal value or higher, with the price difference being settled by the customer.</li>
                <li><strong >Customer&rsquo;s Responsibility:</strong> Shipping and handling fees for exchanges are the responsibility of the customer.</li>
            </ul>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">2. No Refund Policy</h3>
            <p>At Dekobuddy Rugs, we believe in the timeless value of our products, which is why all sales are final. We do not offer refunds under any circumstances. However, our Exchange Policy ensures that your satisfaction remains our priority.</p>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">3. Exclusive 2-Year Warranty</h3>
            <p>Our commitment to luxury and quality is reflected in the 2-year warranty that accompanies each rug we create. Here&rsquo;s what you can expect:</p>
            <ul className="flex-column d-flex row-gap-10">
                <li><strong>Coverage:</strong> Our warranty protects against manufacturing defects such as material flaws or stitching issues.</li>
                <li><strong>Exclusions:</strong> It does not cover damages resulting from misuse, mishandling, or accidents.</li>
                <li><strong>Replacement or Repair:</strong> If your rug meets the warranty criteria, we will offer a repair or replacement at no extra cost.</li>
                <li><strong>Proof of Purchase:</strong> Warranty claims must be accompanied by proof of purchase, and the claim must be made within two years from the original purchase date.</li>
            </ul>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">4. Shipping & Delivery</h3>
            <p>Our rugs are crafted with the utmost care and delivered to you with elegance:</p>
            <ul className="flex-column d-flex row-gap-10">
                <li><strong>Timely Delivery:</strong> We aim to deliver your rug within the estimated delivery period provided at checkout.</li>
                <li><strong>Global Reach:</strong> Whether near or far, Dekobuddy Rugs ships globally, bringing luxury to every corner of the world.</li>
            </ul>
            <p>Please note that while we strive for seamless delivery, we are not responsible for any delays caused by external shipping carriers.</p>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">5. Limitation of Liability</h3>
            <p>While we take immense pride in our rugs, Dekobuddy Rugs&rsquo; liability is limited to the value of the product purchased. We do not hold responsibility for any indirect or incidental damages resulting from the use of our products, except as outlined in our 2-Year Warranty.</p>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">7. Changes to Terms and Conditions</h3>
            <p>We reserve the right to update these terms and conditions as we continue to evolve. Any modifications will be posted on this page. By continuing to use our services, you agree to the updated terms. We encourage you to revisit this page periodically to stay informed.</p>

            <h3 className="font-h3 text-theme1 fw-4 mt-4 mb-3">8. Contact Us</h3>
            <p>For inquiries, support, or additional information, we invite you to reach out to us at <a href="mailto:support@dekobuddy.in" >support@dekobuddy.in</a>. Our team is ready to assist you and ensure your experience with Dekobuddy Rugs is nothing short of exceptional.</p>

            <p>Thank you for choosing Dekobuddy Rugs—where timeless elegance and unparalleled quality meet the art of home décor.</p>
        </Container>);
}