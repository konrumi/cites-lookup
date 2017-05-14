import React, {Component} from 'react';
import _ from 'lodash';

import '../styles/App.css';

import Suggest from '../suggest/suggest';
import Detail from '../detail/detail';

class App extends Component {
    state = {
        isLoading: true,
        matched: null,
        searched: null,
        detail: null
    };

    dataDict = {};

    componentDidMount() {
        let that = this;

        let dataReq = new XMLHttpRequest();
        dataReq.addEventListener('load', reqListener);
        dataReq.open('GET', 'https://raw.githubusercontent.com/konrumi/cites-lookup/master/src/data/data.json', true);
        dataReq.send();

        function reqListener() {
            that.dataDict = JSON.parse(this.responseText);
            that.setState({
                isLoading: false
            });
        }
    }

    getMatchList(str) {
        let searchKey = '';
        let matchedList = [];

        // make list
        if (str.length > 0) {
            // set search key
            if (str.match(/[^a-zA-Z]/g) !== null) {
                // search cnName
                searchKey = 'cnName';
            } else {
                // search
                searchKey = 'binomial';
            }

            _.forEach(this.dataDict, (obj, key) => {
                if (obj[searchKey].match(new RegExp(str, 'gi')) !== null) {
                    matchedList.push({
                        key,
                        obj,
                        index: obj[searchKey].toLowerCase().indexOf(str.toLowerCase())
                    });
                }
            });
        }

        // sort list
        matchedList.sort(function(a, b) {
            if (a.index !== b.index) {
                return (a.index - b.index);
            } else if (a.obj.cnName.length !== b.obj.cnName.length) {
                return (a.obj.cnName.length - b.obj.cnName.length);
            } else {
                return (a.obj.binomial.length - b.obj.binomial.length);
            }
        });

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
            detail: this.dataDict[str]
        });
    }

    render() {
        let getLoading = () => {
            if (this.state.isLoading) {
                return (
                    <div className="App-loading">
                        <span>数据加载中...</span>
                    </div>
                );
            }
        };

        return (
            <div className="App">
                {
                    getLoading()
                }
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
