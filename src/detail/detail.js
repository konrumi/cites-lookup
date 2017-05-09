import React, {Component} from 'react';

import '../styles/detail.css';

class Detail extends Component {
    typeDict = {
        1: 'CITES 附录Ⅰ',
        2: 'CITES 附录Ⅱ',
        3: 'CITES 附录Ⅲ'
    };

    searchCheck(e) {
        if (e.target.dataset.key) {
            this.props.searchCheck(e.target.dataset.key);
        }
    }

    makeSearchResult(list) {
        if (list !== null) {
            return (
                <div>
                    <h3>检索结果 ({list.length})</h3>
                    <ul onClick={this.searchCheck.bind(this)}>
                    {
                        list.map(function(obj, idx) {
                            return (<li key={idx}><a data-key={obj.key}>{obj.obj.cnName} {obj.obj.binomial}</a></li>)
                        })
                    }
                    </ul>
                </div>
            );
        }
    }

    makeDetailData(obj) {
        if (obj) {
            return (
                <div>
                    <h3><span>{obj.group}</span> {obj.cnName} - {obj.binomial}</h3>
                    <table>
                        <tbody>
                        <tr>
                            <th>门 (Phylum)</th>
                            <td>{obj.phylum || '--'}</td>
                        </tr>
                        <tr>
                            <th>纲 (Class)</th>
                            <td>{obj.class || '--'}</td>
                        </tr>
                        <tr>
                            <th>目 (Order)</th>
                            <td>{obj.order || '--'}</td>
                        </tr>
                        <tr>
                            <th>科 (Family)</th>
                            <td>{obj.family || '--'}</td>
                        </tr>
                        <tr>
                            <th>二名法 (Binomial)</th>
                            <td>{obj.binomial || '--'}</td>
                        </tr>
                        <tr>
                            <th>中文名称</th>
                            <td>{obj.cnName || '--'}</td>
                        </tr>
                        <tr>
                            <th>记录位置</th>
                            <td>{this.typeDict[obj.type]}</td>
                        </tr>
                        <tr>
                            <th>中国分布记录</th>
                            <td>{obj.local ? '有' : '无'}</td>
                        </tr>
                        <tr>
                            <th>备注</th>
                            <td><p>{obj.comment || '--'}</p></td>
                        </tr>
                        <tr>
                            <th>链接</th>
                            <td>
                                <ul>
                                    <li><a href={'https://zh.wikipedia.org/wiki/' + obj.binomial} target="_blank">维基百科</a></li>
                                    <li><a href={'http://baike.baidu.com/item/' + obj.cnName} target="_blank">百度百科</a></li>
                                </ul>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            );
        }
    }

    render() {
        return (
            <div className="Detail">
                <div className="Detail-search">
                    {
                        this.makeSearchResult(this.props.list)
                    }
                </div>
                <div className="Detail-data">
                    {
                        this.makeDetailData(this.props.obj)
                    }
                </div>
                <div className="Detail-intro">
                    <p>* 本站数据整理自 <a href="http://www.cites.org.cn/article/list.php?catid=20">中华人民共和国濒危物种科学委员会</a> ，如有疏漏或问题，请及时联系 <a href="https://github.com/konrumi/cites-lookup/issues">作者</a> ，非常感谢！</p>
                    <p>* 本站仅支持Chorme、Firefox等新版浏览器，若您遇到兼容性问题无法使用，请尝试更新浏览器；若您使用国产浏览器，请尝试打开浏览器的“快速模式”，谢谢！</p>
                    <p>* 本站数据仍在整理中，尚不完善，请暂勿作为参考，谢谢！</p>
                    <p>* 如果遇到显示问题，请点击 <a onClick={() => {prompt('请复制下面字符串，非常感谢！', window.navigator.userAgent);}}>这里</a> ，并将弹出的字符串回报给作者，非常感谢！</p>
                </div>
            </div>
        );
    }
}

export default Detail;
