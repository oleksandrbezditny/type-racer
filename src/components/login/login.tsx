import React, { Component, FormEvent, Fragment } from 'react';
import { LoginStore } from 'stores/login-store';

export type LoginProps = Readonly<{
    loginStore: LoginStore;
}>

export class Login extends Component<LoginProps> {
    private _usernameRef: HTMLInputElement | null = null;
    private _passwordRef: HTMLInputElement | null = null;
    render() {
        return (
            <Fragment>
                <form onSubmit={this.tryLogin}>
                    <h3>Sign in</h3>
                    <input type="text" ref={(ref) => this._usernameRef = ref} placeholder="enter you username" />
                    <input type="password" ref={(ref) => this._passwordRef = ref} placeholder="enter password" />
                    <input type="submit" value="Login" />
                </form>
                <input type="button" value="Login as guest" onClick={this.useAsGuest}/>
            </Fragment>
        );
    }

    private tryLogin = (event: FormEvent) => {
        this.props.loginStore.login({
            // username and password refs should exists on this stage.
            username: this._usernameRef!.value,
            password: this._passwordRef!.value,
        });
        event.preventDefault();
    }

    private useAsGuest = () => {
        this.props.loginStore.loginAsGuest();
    }
}