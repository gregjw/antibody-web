import React, { ReactElement } from 'react';
import { ErrorSummary, Header, Container } from 'nhsuk-react-components';
import { FormattedMessage } from 'react-intl';
import PageContent from 'components/ui/PageContent';

interface ErrorState {
  hasError: boolean;
}

interface ErrorBoundaryProps {
  errorComponent?: ReactElement;
}

const DefaultError = () => (
  <ErrorSummary
    data-testid="default-error"
    aria-labelledby="error-summary-title"
    role="alert"
    tabIndex={-1}>
    <ErrorSummary.Title id="error-summary-title">
      <FormattedMessage id="error.title"/>
    </ErrorSummary.Title>
    <ErrorSummary.Body>
      <p><FormattedMessage id="error.body" /></p>
      <ErrorSummary.List>
        <ErrorSummary.Item href="#example-error-1">
          <FormattedMessage id="error.resolution_1" />
        </ErrorSummary.Item>            
      </ErrorSummary.List>
    </ErrorSummary.Body>
  </ErrorSummary>
);


export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorState> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  
  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }
  
  componentDidCatch(error) {
    console.log("caught error", error);
    // You can also log the error to an error reporting service
    // @TODO: Add sentry logging
  }
  
  render() {

    console.log(this.props.errorComponent);
    if (this.state.hasError) {
      return (       
        <PageContent>
          <Header>
            <Header.Container>
              <Header.Logo href="/" />
              <Header.ServiceName href="/">
                <FormattedMessage id="error.header" />
              </Header.ServiceName>
            </Header.Container>
          </Header>
          <Container>
            {this.props.errorComponent || <DefaultError />}
          </Container>
        </PageContent>
      );
    }
  
    return this.props.children; 
  }
}