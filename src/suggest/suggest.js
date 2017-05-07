import React, {Component} from 'react';
import _ from 'lodash';

import '../styles/suggest.css';


class Suggest extends Component {
    changeHandler(e) {
        this.props.suggestInput(e.target.value);

    }

    clickHandler(e) {
        this.props.suggestCheck(e.target.dataset.name);
        this.refs['textInput'].value = e.target.innerText;
    }

    clearInput() {
        this.refs['textInput'].value = '';
        this.props.suggestCheck('');
    }

    renderList(listData) {
        if (listData.length > 0) {
            return (
                <ul onClick={this.clickHandler.bind(this)}>
                    {
                        listData.map(function(data, idx) {
                            return (
                                <li key={idx} data-name={data.key}>{data.obj.cnName} {data.obj.binomial}</li>
                            );
                        })
                    }
                </ul>
            );
        }
    }

    render() {
        let showList = _.cloneDeep(this.props.matched);

        showList = showList.slice(0, this.props.suggLength || 10);

        showList.sort(function(a, b) {
            if (a.index !== b.index) {
                return (a.index - b.index);
            } else if (a.obj.cnName.length !== b.obj.cnName.length) {
                return (a.obj.cnName.length - b.obj.cnName.length);
            } else {
                return (a.obj.binomial.length - b.obj.binomial.length);
            }
        });

        return (
            <div className="Suggest">
                <div className="Suggest-input-container">
                    <input type="text" placeholder="请输入物种名..." onChange={this.changeHandler.bind(this)} ref="textInput" />
                    <a href="#" onClick={this.clearInput.bind(this)}>&#215;</a>
                    {
                        this.renderList(showList)
                    }
                </div>
            </div>
        );
    }
}

export default Suggest;