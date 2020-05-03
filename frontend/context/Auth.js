import React from "react";

export const AuthContext = React.createContext({
  isAuthenticated: false,
  setAuthentication: () => {},
  token: "",
  setToken: () => {},
});

export class AuthProvider extends React.Component {
  state = {
    isAuthenticated: this.props.isAuthenticated,
    token: this.props.token,
    setAuthentication: (value) => {
      this.setState({
        isAuthenticated: value,
      });
    },
    setToken: (value) => {
      this.setState({
        token: value,
      });
    },
  };

  render() {
    return (
      <AuthContext.Provider value={this.state}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export const useAuthenticated = () => {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context.isAuthenticated;
};
