import React, { ErrorInfo } from "react";
import { Action, ActionType, useStateContext } from "_libs/_state";

const Dispatcher: React.FC<Action> = ({type, payload}) => {
  const { dispatch } = useStateContext()
  // const { messages } = useStateContext().state.messages
  React.useEffect(() => {
    type && dispatch && dispatch({
      type: type,
      payload: payload,
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return null;
}

class ErrorBoundary extends React.Component {
  state: { hasError: boolean, error?: Error };
  log: any;
  action: Action;

  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
    this.action =  {type: ActionType.NEW_MESSAGE, payload: {title: 'Error', body: ''}}
  }

  logError(error: Error, errorInfo: ErrorInfo): void  {
    console.error(error, errorInfo)
  }
  static getDerivedStateFromError(error: Error) {
    // Update state to trigger fallback UI
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error or send logging data to log management tool
    this.logError(error, errorInfo)
  }
  render() {
    if (this.state.hasError) {

      const a: Action = {
        ...this.action, 
        payload: {
          ...this.action.payload,
          body: this.state.error?.message || ''
        }}
      return <>
              <h1>Noget gik galt...</h1>
              <Dispatcher {...a} />
            </>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

