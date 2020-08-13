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
        const { isLoading, gif, tag } = this.state;
    
        return (
                <GifBox isLoading={isLoading} tag={tag} gif={gif} />
        );
      }
    
      async componentDidMount() {
        // Load async data.
        
        try {
            let tagData = await API.get('', {
            params: {}
            });

            // Individual move
        const move = tagData.data.moves[0];
            // Array of move objects
        const moveObject = tagData.data.moves;
        console.log(moveObject);
        
  

        // Update state with new data and re-render our component.
        const gif = "http://192.168.0.102:5555" + move.thumbnail;
        const tag = move.tags;

        this.setState({
          ...this.state, ...{
            isLoading: false,
            gif,
            tag
          }
        });
      } catch (e) {
        console.log("error" + e);
        }
    }
}

export default ReturnedGifs