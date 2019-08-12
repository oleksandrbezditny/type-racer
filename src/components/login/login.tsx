import React, { Component, FormEvent, Fragment } from 'react';
import { action, observable } from 'mobx';
import { observer } from 'mobx-react';
import { isSomething } from 'utils';
import { LoginStore } from 'stores';

export type LoginProps = Readonly<{
    loginStore: LoginStore;
}>

@observer
export class Login extends Component<LoginProps> {
    private _usernameRef: HTMLInputElement | null = null;
    private _passwordRef: HTMLInputElement | null = null;
    @observable
    private _formIsValid: boolean = false;

    render() {
        return (
            <Fragment>
                <form onSubmit={this.tryLogin}>
                    <h3>Sign in</h3>
                    <input
                        type="text"
                        ref={(ref) => this._usernameRef = ref}
                        placeholder="enter you username"
                        onChange={this.validateForm}
                    />
                    <input
                        type="password"
                        ref={(ref) => this._passwordRef = ref}
                        placeholder="enter password"
                        onChange={this.validateForm}
                    />
                    <input type="submit" value="Login" disabled={!this._formIsValid}/>
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

    @action
    private validateForm = (): void => {
        this._formIsValid = isSomething(this._usernameRef)
            && isSomething(this._passwordRef)
            && !!this._usernameRef.value
            && !!this._passwordRef.value;
    }
}