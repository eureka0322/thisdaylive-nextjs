import { useState, useEffect } from 'react';
import { postNewsletterSignUpForm } from '../../lib/api_client';
import { toast } from 'react-toastify';
import NProgress from 'nprogress'; //nprogress module


export default function NewsletterSignUp(){

    
    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");

    const startLoading = () => NProgress.start();
    const endLoading = () => NProgress.done();

    const onChangeFirstName = (event) => {
        setFirstName(event.target.value);
    }

    const onChangeLastName = (event) => {
        setLastName(event.target.value);
    }

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    }

    const onChangePhoneNumber = (event) => {
        setPhoneNumber(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        //validation
        if(firstName == "" || lastName  == ""){
            toast.error("Please enter your Name");
            return;
        }
        if(email == ""){
            toast.error("Please supply a valid email address .");
            return;
        }
        
        startLoading();
        const result = await postNewsletterSignUpForm(firstName, lastName, email, phoneNumber);
        if (typeof result == "boolean") {
            setFirstName("");
            setLastName("");
            setEmail("");
            setPhoneNumber("");
            toast.success("Thank you, your sign-up request was successful! Please check your email inbox to confirm.");
            console.log("Thank you, your sign-up request was successful! Please check your email inbox to confirm.");
        }
        else{
            if( "message" in result){
                toast.warning(result['message']);
                console.log("error");
            }
        }
 
        endLoading();
    }
    return (
        <>
            <h1></h1>
            <h2 className="wp-block-heading title-page">Newsletter Sign Up</h2>
            <p>Sign up for our free newsletter and stay updated with the latest goings on at THISDAY! Join our growing community of well-informed readers, and enjoy thought-provoking analysis, engaging content, and a fresh perspective on Nigeria’s fast-paced world. Stay connected with the heartbeat of the nation – subscribe to THISDAY newsletter today!</p>

            <div  className="wp-block-columns is-layout-flex wp-container-3">
                <div className="wp-block-column is-layout-flow">
                    <form onSubmit={handleSubmit} id="mc4wp-form-1" className="mc4wp-form mc4wp-form-858247 mc4wp-form-submitted mc4wp-form-error mc4wp-form-basic email-form" method="post" data-id="858247" data-name="THISDAY General">
                        <div className="mc4wp-form-fields">
                            <p>
                                <label>First Name</label>
                                <input value={firstName} onChange={onChangeFirstName} type="text" name="FNAME" placeholder="Your First Name"/>
                            </p>
                            <p>
                                <label>Last Name</label>
                                <input value={lastName} onChange={onChangeLastName} type="text" name="LNAME" placeholder="Your Last Name"/>
                            </p>
                            <p>
                                <label>Mobile Number</label>
                                <input value={phoneNumber} onChange={onChangePhoneNumber} type="tel" name="PHONE" placeholder="Your WhatsApp Registered Number"/>
                            </p>
                            <p>
                                <label>Email address</label>
                                <input value={email} onChange={onChangeEmail} type="email" name="EMAIL" placeholder="Your email address" required/>
                            </p>

                            <p>
                                <input type="submit" className="search-submit" value="Sign up" />
                            </p>
                        </div>
                    </form>
                </div>
                <div className="wp-block-column is-layout-flow">
                    <ul className="has-grey-background-color has-background">
                        <li>Exclusive Special Offers from our Partners</li>
                        <li>WhatsApp Only Headlines</li>
                        <li>Access Arise Play Content First</li>
                        <li>Content Personalised to You!</li>
                        <li>Join our Mobile App Beta Program</li>
                        <li>Stay ahead with Arise Media Group's event updates and early ticket access.</li>
                    </ul>
                </div>
            </div>
        </>
    );
}