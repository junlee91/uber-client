import React from "react";
import { Query } from "react-apollo";
import { RouteComponentProps } from "react-router";
import { getRide, getRideVariables } from "src/types/api";

import RidePresenter from "./RidePresenter";
import { GET_RIDE } from "./RideQueries";

class RideQuery extends Query<getRide, getRideVariables> {}

interface IProps extends RouteComponentProps<any> {}

class RideContainer extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
    if (!props.match.params.rideId) {
      props.history.push("/");
    }
  }

  public render() {
    const {
      match: {
        params: { rideId }
      }
    } = this.props;

    return (
      <RideQuery query={GET_RIDE} variables={{ rideId }}>
        {rideData => <RidePresenter data={rideData} />}
      </RideQuery>
    );
  }
}

export default RideContainer;
