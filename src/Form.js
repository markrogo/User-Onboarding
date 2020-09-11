import React, { useState, useEffect } from "react";
import axios from "axios";
import * as yup from "yup";

const formSchema = yup.object().shape({
    name: yup.string().required("Name is a required field"),
    email: yup
        .string()
        .email("Must be a valid email address")
        .required("You must provide an email address"),
    password: yup.string().required("You must create a password"),
    role: yup.string(),
    terms: yup.boolean().oneOf([true], "You must accept the Terms of Service to continue"),    
});


export default function Form (props) {
    // start with form state
    const [formState, setFormState] = useState ({
        name: "",
        email: "",
        password: "",
        role: "",
        terms: false
    });

    // make the button only work when the form has been validated
    const [buttonDisabled, setButtonDisabled] = useState(true);
    // Check validation every time formState changes
    // only make button work when the form passes validation
        useEffect(() => {
            formSchema.isValid(formState).then(valid => {
            setButtonDisabled(!valid);
        });
    }, [formState]);

    // set up error state
    const [errorState, setErrorState] = useState ({
        name: "",
        email: "",
        password: "",
        role: "",
        terms: "",
    });

    // validation, includes dealing with checkbox specially

    const validate = e => {
        let value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        yup 
            .reach(formSchema, e.target.name)
            .validate(value)
            .then(valid => {
                setErrorState({
                    ...errorState,
                    [e.target.name]: ""
                });
            })
            .catch(err => {
                setErrorState({
                    ...errorState,
                    [e.target.name]:err.errors[0]
                });
            });
    };

    // set up on change function, dealing with checkbox specially
    const inputChange = e => {
        e.persist();
        console.log("input changed ", e.target.value, e.target.checked);
        validate(e);
        let value =
            e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setFormState({...formState, [e.target.name]: value });
    };


    // set up submission
    const formSubmit = e => {
        e.preventDefault();
        console.log("form submitted!");
        props.addTeamMember(formState);
        axios 
            .post("https://reqres.in/api/users", formState)
            .then(response => console.log(response))
            .catch(err => console.log(err));
        setFormState ({
            name: "",
            email: "",
            password: "",
            role: "",
            terms: false
        });
    };

    // set up JSX for form
    return (
        <form onSubmit={formSubmit}>
            <div>
            <label htmlFor="name">
                Name
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={formState.name}
                    onChange={inputChange}
                />
            </label>
            </div><div>
            <label htmlFor="email">
                Email
                <input
                    type="email"
                    name="email"
                    id="email"
                    value={formState.email}
                    onChange={inputChange}
                />
                {errorState.email.length > 0 ? (
                    <p className="error">{errorState.email}</p>
                ) : null}
            </label>
            </div><div>
            <label htmlFor="password">
                Password
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={formState.password}
                    onChange={inputChange}
                />
            </label>
            </div><div>
            <label htmlFor="role">
                What's your role?
                <select
                    value={formState.role}
                    name="role"
                    id="role"
                    onChange={inputChange}>
                <option value ="">Select from the dropdown</option>
                <option value="Section Lead">Section Lead</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Instructor">Instructor</option>
                <option value="Student">Student</option>
                </select>
                {errorState.role.length > 0 ? (
                     <p className="error">{errorState.role}</p>
                ) : null}

            </label>
            </div><div>
            <label htmlFor="terms">
                <input
                    type="checkbox"
                    name="terms"
                    id="terms"
                    value={formState.terms}
                    onChange={inputChange}
                />Click here to accept Terms and Conditions
                {errorState.terms.length > 0 ? (
                    <p className="error">{errorState.terms}</p>
                ) : null}
            </label>
            
            </div>
            <button type="submit" disabled={buttonDisabled}>Submit</button>
        </form>
    )

};