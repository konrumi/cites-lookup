import React, {Component} from 'react';
import _ from 'lodash';

import '../styles/App.css';

import Suggest from '../suggest/suggest';
import Detail from '../detail/detail';

import data from '../data/data';

class App extends Component {
    state = {
        matched: null,
        searched: null,
        detail: null
    };

    getMatchList(str) {
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
        }

        return matchedList;
    }

    suggestInput(str) {
        // clear result
        if (str.length === 0) {
            this.setState({
                searched: null,
                matched: null,
                detail: null
            });
        }

        // assign result to list
        this.setState({
            searched: null,
            matched: this.getMatchList(str),
            detail: null
        });
    }

    suggestSearch(str) {
        this.setState({
            searched: this.getMatchList(str),
            matched: null,
            detail: null
        });
    }

    suggestCheck(str) {
        this.setState({
            searched: null,
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
                        suggLength={5}
                        matched={this.state.matched}
                        suggestInput={(str) => {
                            this.suggestInput(str);
                        }}
                        suggestSearch={(str) => {
                            this.suggestSearch(str);
                        }}
                        suggestCheck={(name) => {
                            this.suggestCheck(name);
                        }}
                    />
                </div>
                <div className="App-content">
                    <Detail
                        list={this.state.searched}
                        obj={this.state.detail}
                        searchCheck={(name) => {
                            this.suggestCheck(name);
                        }}
                    />
                </div>
            </div>
        );
    }
}

export default App;
