import React, {Component} from 'react';
import _ from 'lodash';

import '../styles/App.css';

import Suggest from '../suggest/suggest';
import Detail from '../detail/detail';

import data from '../data/data';

class App extends Component {
    state = {
        matched: [],
        detail: null
    };


    suggestInput(str) {
        let searchKey = '';
        let matchedList = [];

        if (str.length > 0) {
            // set search key
            if (str.match(/[^a-zA-Z]/g) !== null) {
                // search cnName
                searchKey = 'cnName';
            } else {
                // search
                searchKey = 'binomial';
            }

            _.forEach(data.dataDict, (obj, key) => {
                if (obj[searchKey].match(new RegExp(str, 'gi')) !== null) {
                    matchedList.push({
                        key,
                        obj,
                        index: obj[searchKey].indexOf(str)
                    });
                }
            });
        } else {
            this.setState({
                detail: null
            });
        }

        this.setState({
            matched: matchedList
        });
    }

    suggestCheck(str) {
        this.setState({
            matched: [],
            detail: data.dataDict[str]
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <h2>《濒危野生动植物种国际贸易公约》(CITES) 速查器</h2>
                    <Suggest
                        suggestInput={(str) => {
                            this.suggestInput(str);
                        }}
                        suggestCheck={(name) => {
                            this.suggestCheck(name);
                        }}
                        suggLength={5}
                        matched={this.state.matched}
                    />
                </div>
                <div className="App-content">
                    <Detail
                        obj={this.state.detail}
                    />
                </div>
            </div>
        );
    }
}

export default App;
