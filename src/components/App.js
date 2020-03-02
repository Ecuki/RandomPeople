import React from "react";
import Header from "./Header";
import { Person } from "./Person";
import MyMap from "./Map";
import Footer from "./Footer";
const personAPI = "https://randomuser.me/api/";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.withFetching = this.withFetching.bind(this);
  }
  withFetching = url => Component =>
    class WithFetching extends React.Component {
      constructor(props) {
        super(props);
        this.state = {
          data: null,
          isLoanding: false,
          error: null
        };
        this.getRandomData = this.getRandomData.bind(this);
        this.fetchData = this.fetchData.bind(this);
      }
      fetchData() {
        this.setState({ isLoanding: true });
        fetch(url)
          .then(response => {
            return response.json();
          })
          .then(myJson => {
            this.setState({
              data: myJson,
              isLoanding: false
            });
          })
          .catch(error =>
            this.setState({
              error,
              isLoanding: false
            })
          );
      }
      getRandomData() {
        this.fetchData();
      }
      componentDidMount() {
        this.fetchData();
      }
      render() {
        return (
          <Component
            {...this.props}
            {...this.state}
            getRandomData={this.getRandomData}
          />
        );
      }
    };

  render() {
    const PersonWitchFetching = this.withFetching(personAPI)(Person);
    return (
      <div className="App" id="App">
        <Header />
        <PersonWitchFetching withFetching={this.withFetching} />

        <Footer />
      </div>
    );
  }
}
export default App;
