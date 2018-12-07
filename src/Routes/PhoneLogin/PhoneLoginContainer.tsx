import React from "react";
import { Mutation } from "react-apollo";
import { RouteComponentProps } from "react-router-dom";
import { toast } from "react-toastify";
import { startPhoneVerification, startPhoneVerificationVariables } from '../../types/api';
import PhoneLoginPresenter from "./PhoneLoginPresenter";
import { PHONE_SIGN_IN } from "./PhoneQueries.queries";

interface IState {
  countryCode: string;
  phoneNumber: string;
}

class PhoneSignInMutation extends Mutation<startPhoneVerification, startPhoneVerificationVariables> {}

class PhoneLoginContainer extends React.Component<
  RouteComponentProps<any>,
  IState
> {
  public state = {
    countryCode: "+1",
    phoneNumber: ""
  };

  public render() {
    const { history } = this.props;
    const { countryCode, phoneNumber } = this.state;

    return (
      <PhoneSignInMutation
        mutation={PHONE_SIGN_IN}
        variables={{
          phoneNumber: `${countryCode}${phoneNumber}`
        }}
        onCompleted={(data) => {
          const { StartPhoneVerfification } = data;
          const phone = `${countryCode}${phoneNumber}`;
          if (StartPhoneVerfification.ok) {
            toast.success("SMS Sent! Redirecting...");
            setTimeout(() => {
              history.push({
                pathname: "/verify-phone",
                state: {
                  phone
                }
              });
            }, 2000)
            return;
          } else {
            toast.error(StartPhoneVerfification.error);
          }
        }}
      >
        {(mutation, { loading }) => {
          const onSubmit: React.FormEventHandler<HTMLFormElement> = event => {
            event.preventDefault();
            const phone = `${countryCode}${phoneNumber}`;
            const isValid = /^\+[1-9]{1}[0-9]{7,11}$/.test(phone);
            if (isValid) {
              mutation();
            } else {
              toast.error("Please write a valid phone number");
            }
          };
          return (
            <PhoneLoginPresenter
              countryCode={countryCode}
              phoneNumber={phoneNumber}
              onInputChange={this.onInputChange}
              onSubmit={onSubmit}
              loading={loading}
            />
          );
        }}
      </PhoneSignInMutation>
    );
  }

  // TODO: validate input value before changing the state
  public onInputChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = event => {
    const {
      target: { name, value }
    } = event;
    this.setState({
      [name]: value
    } as any);
  };
}

export default PhoneLoginContainer;
