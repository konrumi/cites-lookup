import React, {Component} from 'react';
import _ from 'lodash';

import '../styles/suggest.css';


class Suggest extends Component {
    keyboardActiveItem = null;

    showList = [];

    changeHandler(e) {
        this.keyboardActiveItem = null;
        this.props.suggestInput(_.trim(e.target.value));
    }

    clickSuggestHandler(e) {
        this.keyboardActiveItem = null;
        if (e.target.dataset.key) {
            this.props.suggestCheck(e.target.dataset.key);
        }
    }

    clickSearchHandler() {
        this.keyboardActiveItem = null;
        if (this.refs['textInput'].value) {
            this.props.suggestSearch(_.trim(this.refs['textInput'].value));
        }
    }

    keydownHandler(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            if (this.keyboardActiveItem === null) {
                // trigger search
                this.props.suggestSearch(_.trim(e.target.value));
                this.refs['textInput'].blur();
            } else {
                // trigger detail
                this.keyboardActiveItem = null;
                if (this.refs['suggList'] && this.refs['suggList'].querySelectorAll('li.active').length > 0) {
                    this.props.suggestCheck(this.refs['suggList'].querySelectorAll('li.active')[0].dataset.key);
                }
            }

        } else if (e.key === 'ArrowDown' && this.showList.length) {
            e.preventDefault();
            if (this.keyboardActiveItem === null) {
                this.keyboardActiveItem = 0;
            } else {
                this.keyboardActiveItem = (this.keyboardActiveItem + 1) % this.showList.length;
            }

        } else if (e.key === 'ArrowUp' && this.showList.length) {
            e.preventDefault();
            if (this.keyboardActiveItem === null) {
                this.keyboardActiveItem = -1;
            } else {
                this.keyboardActiveItem = (this.keyboardActiveItem - 1) % this.showList.length;
            }

        } else {
            this.keyboardActiveItem = null;
        }

        if (this.keyboardActiveItem !== null) {
            this.markSugguestItem(this.keyboardActiveItem >= 0 ? this.keyboardActiveItem : this.keyboardActiveItem + this.showList.length);
        }
    }

    markSugguestItem(index) {
        if (index !== null) {
            this.clearSuggestMark();
            this.refs['suggList'].querySelectorAll('li')[index].className = 'active';
        }
    }

    clearSuggestMark() {
        if (this.refs['suggList'] && this.refs['suggList'].querySelectorAll('li.active').length) {
            this.refs['suggList'].querySelectorAll('li.active').forEach(function(ele) {
                ele.className = '';
            });
        }
    }

    clearInput() {
        this.refs['textInput'].value = '';
        this.props.suggestInput('');
    }

    renderList(listData) {
        if (listData && listData.length > 0) {
            return (
                <ul onClick={this.clickSuggestHandler.bind(this)} ref="suggList">
                    {
                        listData.map(function(data, idx) {
                            return (
                                <li key={idx} data-key={data.key}>{data.obj.cnName} {data.obj.binomial}</li>
                            );
                        })
                    }
                </ul>
            );
        }
    }

    render() {
        this.showList = _.cloneDeep(this.props.matched);

        if (this.props.matched !== null) {
            this.showList = this.showList.slice(0, this.props.suggLength || 10);
        }

        this.clearSuggestMark();

        return (
            <div className="Suggest">
                <div className="Suggest-input-container">
                    <input type="text" placeholder="请输入物种名..." onKeyDown={this.keydownHandler.bind(this)} onChange={this.changeHandler.bind(this)} onClick={this.changeHandler.bind(this)} ref="textInput" />
                    <button onClick={this.clickSearchHandler.bind(this)}>&#8629;</button>
                    <a onClick={this.clearInput.bind(this)}>&#215;</a>
                    {
                        this.renderList(this.showList)
                    }
                </div>
            </div>
        );
    }
}

export default Suggest;