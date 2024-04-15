export const oktaConfig = {
    clientId: '0oafzt57xpshGYWwM5d7',
    issuer: 'https://dev-06815052.okta.com/oauth2/default',
    redirectUri: 'http://localhost:3000/login/callback',
    scopes: ['openid', 'profile', 'email'],
    pkce: true,
    disableHttpsCheck: true,
    features: {
        registration: true,
        rememberMe: true,
        autoPush: true,
        router: true,
    }
}