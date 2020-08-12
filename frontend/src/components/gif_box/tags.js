import React from 'react';
import API from './API';
import Descriptor from './descriptor';

class Tags extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: true,
          tag: null,
        };
      }
    
      render() {
        const { isLoading, tag } = this.state;
    
        return (
          <Descriptor isLoading={isLoading} tag={tag} />
          
        );
      }
    
      async componentDidMount() {
        // Load async data.
        
        try {
            let tagData = await API.get('', {
            params: {}
            });

            // Parse the results for ease of use.
        tagData = tagData.data.moves[0];
        console.log(tagData);

        // Update state with new data and re-render our component.????????????//
        const tag = tagData[0];
        console.log(tag);

        this.setState({
          ...this.state, ...{
            isLoading: false,
            tag
          }
        });
      } catch (e) {
        console.log("error" + e);
        }
    }
}

export default Tags