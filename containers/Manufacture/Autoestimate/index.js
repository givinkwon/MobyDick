
@inject()
@observer
class AutoestimateContainer extends React.Component {
  componentDidMount = () => {
  };
  render() {
    const { Request } = this.props;
    return (
      <>
        <Background>
          <Containerv1 style={{ width: 792 }}>
            <Request />
          </Containerv1>
        </Background>
      </>
    );
  }
}

export default AutoestimateContainer;
