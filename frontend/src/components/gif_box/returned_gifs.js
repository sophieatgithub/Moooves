import React from 'react';
import API from './API';
import GifBox from './gif_box';

class ReturnedGifs extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: true,
          gif: null,
          tag: [],
        };
      }
    
      render() {
        const { isLoading, movesArray, gif, tag } = this.state;
    
        return (
                <GifBox isLoading={isLoading} movesArray={movesArray} />
        );
      }
    
      async componentDidMount() {
        // Load async data.
        
        try {
            let moveData = await API.get('', {
            params: {} 
            });

            // Array of move objects
        const movesArray = moveData.data.moves;


        this.setState({
          ...this.state, ...{
            isLoading: false,
            movesArray,
          }
        });
      } catch (e) {
        console.log("error" + e);
        }
    }
}

export default ReturnedGifs