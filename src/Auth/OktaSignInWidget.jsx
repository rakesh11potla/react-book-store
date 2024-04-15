import React, { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom'; // Import useHistory for redirection
import OktaSignIn from '@okta/okta-signin-widget';
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';
import { oktaConfig } from '../lib/oktaConfig';

const OktaSignInWidget = ({ onSuccess, onError }) => {
    const history = useHistory(); // Initialize history
    const widgetRef = useRef();

    useEffect(() => {

        if (!widgetRef.current) {
            return false;
        }

        const widget = new OktaSignIn({
            ...oktaConfig,
            features: {
                registration: true, // Enable registration feature
            },
        });

        widget.showSignInToGetTokens({
            el: widgetRef.current,
        }).then(onSuccess).catch(onError);

        // Handle sign-up link click event
        widget.on('afterRender', () => {
            const signUpLink = document.querySelector('.registration-link');
            if (signUpLink) {
                signUpLink.addEventListener('click', () => {
                    history.push('/signup'); // Redirect to your custom signup page
                });
            }
        });

        return () => widget.remove();
    }, [onSuccess, onError, history]);

    return (
        <div className='container mt-5 mb-5'>
            <div ref={widgetRef}></div>
        </div>
    );
};

export default OktaSignInWidget;
