import React from 'react';
import ReactDOM from 'react-dom';

class AjaxDemo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        items: []
      };
    }

    componentDidMount() {
      fetch("http://localhost:5555/items", {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }

        })
        .then(res => res.json())
        .then((result) => {
            this.setState({
              isLoaded: true,
              items: result.items
            });
          },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }

    render() {
      const {
        error,
        isLoaded,
        items
      } = this.state;
      if (error) {
        return <div > Error: {
          error.message
        } < /div>;
      } else if (!isLoaded) {
        return <div > Loading... < /div>;
      } else {
        return ( < ul > {

            items.map(item => ( <
              li key = {
                item.name
              } > {
                item.name
              } {
                item.price
              } <
              /li>
            ))
          } < /ul>);
        }

      }
    }

    export default AjaxDemo;
