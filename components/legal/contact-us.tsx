import { useState, useEffect } from 'react';
import { postContactUsForm } from '../../lib/api_client';
import { toast } from 'react-toastify';
import NProgress from 'nprogress'; //nprogress module


export default function ContactUs(){

    
    const [message, setMessage] = useState<string>("");
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


    const handleMessage = (event) => {
        setMessage(event.target.value);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        //validation
        if(firstName == "" || lastName  == ""){
            toast.error("We need to know your name. What if we wanted to send you a birthday cake? Please complete the following fields: First, Last.");
            return;
        }
        if(email == ""){
            toast.error("please supply a valid email address .");
            return;
        }
        if(message == ""){
            toast.error("Message field is required.");
            return;
        }
        
        startLoading();
        const result = await postContactUsForm(firstName, lastName, email, message);
        if( "id" in result){
            toast.success("Thank you for contacting us! We will get in touch with you shortly.");
            setFirstName("");
            setLastName("");
            setEmail("");
            setMessage("");
            console.log("success");
        }
        else{
            toast.error("Something wrong.");
            console.log("Something wrong.");
        }
        endLoading();
    }
    return (
        <>
            <h1>Contact Us</h1>
            <div className="gf_browser_chrome gform_wrapper gravity-theme gform-theme--no-framework" data-form-theme="gravity-theme" data-form-index="0" id="gform_wrapper_17">
                <div className="gform_heading">
                    <p className="gform_description"></p>
                </div>
                <form onSubmit={handleSubmit} method="post" encType="multipart/form-data" id="gform_17" action="/index.php/contact-us/" data-formid="17" noValidate={false}>
                    <div className="gform-body gform_body">
                        <div id="gform_fields_17" className="gform_fields top_label form_sublabel_above description_above">
                            <fieldset id="field_17_1" className="gfield gfield--type-name gfield_contains_required field_sublabel_hidden_label gfield--no-description field_description_above gfield_visibility_visible" data-js-reload="field_17_1">
                                <legend className="gfield_label gform-field-label gfield_label_before_complex">Name<span className="gfield_required"><span className="gfield_required gfield_required_text">(Required)</span></span></legend>
                                <div className="ginput_complex ginput_container ginput_container--name no_prefix has_first_name no_middle_name has_last_name no_suffix gf_name_has_2 ginput_container_name gform-grid-row" id="input_17_1">
                                    <span id="input_17_1_3_container" className="name_first gform-grid-col gform-grid-col--size-auto">
                                    <input value={firstName} onChange={onChangeFirstName} type="text" name="input_1.3" id="input_17_1_3"  aria-required="true" placeholder="First Name" autoComplete="given-name"/>
                                    <label htmlFor="input_17_1_3" className="gform-field-label gform-field-label--type-sub hidden_sub_label screen-reader-text">First</label>
                                    </span>
                                    <span id="input_17_1_6_container" className="name_last gform-grid-col gform-grid-col--size-auto">
                                    <input value={lastName} onChange={onChangeLastName} type="text" name="input_1.6" id="input_17_1_6" aria-required="true" placeholder="Last Name" autoComplete="family-name"/>
                                    <label htmlFor="input_17_1_6" className="gform-field-label gform-field-label--type-sub hidden_sub_label screen-reader-text">Last</label>
                                    </span>
                                </div>
                            </fieldset>
                            <div id="field_17_2" className="gfield gfield--type-email gfield--width-full gfield_contains_required field_sublabel_above gfield--no-description field_description_above gfield_visibility_visible" data-js-reload="field_17_2">
                                <label className="gfield_label gform-field-label" htmlFor="input_17_2">Email<span className="gfield_required"><span className="gfield_required gfield_required_text">(Required)</span></span></label>
                                <div className="ginput_container ginput_container_email">
                                    <input value={email} onChange={onChangeEmail}  name="input_2" id="input_17_2" type="email" className="large" placeholder="Email" aria-required="true" aria-invalid="false"/>
                                </div>
                            </div>
                            <div id="field_17_3" className="gfield gfield--type-textarea gfield--width-full gfield_contains_required field_sublabel_above gfield--has-description field_description_above gfield_visibility_visible" data-js-reload="field_17_3">
                                <label className="gfield_label gform-field-label" htmlFor="input_17_3">Message<span className="gfield_required"><span className="gfield_required gfield_required_text">(Required)</span></span></label>
                                <div className="gfield_description" id="gfield_description_17_3">Please let us know what's on your mind. Have a question for us? Ask away.</div>
                                <div className="ginput_container ginput_container_textarea">
                                    <textarea value={message} onChange={handleMessage} name="input_3" id="input_17_3" className="textarea medium" aria-describedby="gfield_description_17_3" maxLength={600} aria-required="true" aria-invalid="false" rows={10} cols={50}></textarea>
                                    <div className="charleft ginput_counter gfield_description" aria-live="polite">{message.length} of 600 max characters</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="gform_footer top_label"> 
                        <input type="submit" id="gform_submit_button_17" className="gform_button button" value="Submit"/> 
                        <input type="hidden" className="gform_hidden" name="is_submit_17" value="1"/>
                        <input type="hidden" className="gform_hidden" name="gform_submit" value="17"/>
                        <input type="hidden" className="gform_hidden" name="gform_unique_id" value=""/>
                        <input type="hidden" className="gform_hidden" name="state_17" value="WyJbXSIsImJiYzZjOWE4NzllMDYxZjNkNjdlODljZjlhMDZmMzIzIl0="/>
                        <input type="hidden" className="gform_hidden" name="gform_target_page_number_17" id="gform_target_page_number_17" value="0"/>
                        <input type="hidden" className="gform_hidden" name="gform_source_page_number_17" id="gform_source_page_number_17" value="1"/>
                        <input type="hidden" name="gform_field_values" value=""/>
                    </div>
                </form>
            </div>
        </>
    );
}