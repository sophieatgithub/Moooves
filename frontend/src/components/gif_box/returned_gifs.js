import React from 'react';
import API from './API';
import { parameters } from "../app_bar/search";
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
    
      async componentDidMount(parameters) {
        // Load async data.
        // var parameters = props.parameters;
        
        try {
            let moveData = await API.get('', {
            params: {
              parameters
            } 
            });

            // Array of move objects
        const movesArray = moveData.data.moves;
        console.log(parameters);


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