import React from 'react';
import API from './API';
import Gif from './gif';
import Tags from './tags';



class GifBox extends React.Component {
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
            <>
                <Gif isLoading={isLoading} gif={gif} />
                <Tags isLoading={isLoading} tag={tag} />
            </>
        );
      }
    
      async componentDidMount() {
        // Load async data.
        
        try {
            let tagData = await API.get('', {
            params: {}
            });

            // Parse the results for ease of use.
        const move = tagData.data.moves[0];
  

        // Update state with new data and re-render our component.????????????//
        const gif = "http://192.168.0.102:5555" + move.thumbnail;
        const tag = move.tags;
        console.log(tag);

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

export default GifBox