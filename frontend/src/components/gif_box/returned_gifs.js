import React from 'react';
import API from './API';
import GifBox from './gif_box';
import '../../css/gif_grid.css'

class ReturnedGifs extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
          isLoading: true,
        };
      }
    
      render() {
        const { isLoading, movesArray } = this.state;
    
        return (
          <div className="gifGridContainer">
                <GifBox isLoading={isLoading} movesArray={movesArray} />
          </div>      
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