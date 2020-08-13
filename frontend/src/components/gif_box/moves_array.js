import React, { Component } from 'react';
import API from './API';
import ReturnedGifs from './returned_gifs';

export default class MovesArray extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            isLoading: true,
        };
    }

    async componentDidMount() {
        // Load async data.
        
        try {
            let tagData = await API.get('', {
            params: {}
            });

            // Array of move objects
        const movesArray = tagData.data.moves;

        // Update state with new data and re-render our component.
        this.setState({
          ...this.state, ...{
            isLoading: false,
            movesArray
          }
        });
      } catch (e) {
        console.log("error: " + e);
        }
    }

    render() {
        const { movesArray, isLoading } = this.state;

        return (
            <ReturnedGifs movesArray={movesArray} isLoading={isLoading} />
        );
    }
    
}