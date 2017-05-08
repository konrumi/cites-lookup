import React, {Component} from 'react';

import '../styles/detail.css';

class Detail extends Component {
    typeDict = {
        1: 'CITES 附录I',
        2: 'CITES 附录II',
        3: 'CITES 附录III'
    };

    makeData(obj) {
        if (obj) {
            return (
                <div>
                    <h3><span>{obj.group}</span> {obj.cnName} - {obj.binomial}</h3>
                    <table>
                        <tbody>
                        <tr>
                            <th>门 (Phylum)</th>
                            <td>{obj.phylum}</td>
                        </tr>
                        <tr>
                            <th>纲 (Class)</th>
                            <td>{obj.class}</td>
                        </tr>
                        <tr>
                            <th>目 (Order)</th>
                            <td>{obj.order}</td>
                        </tr>
                        <tr>
                            <th>科 (Family)</th>
                            <td>{obj.family}</td>
                        </tr>
                        <tr>
                            <th>二名法 (Binomial)</th>
                            <td>{obj.binomial}</td>
                        </tr>
                        <tr>
                            <th>中文名称</th>
                            <td>{obj.cnName}</td>
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
                            <td>{obj.comment || '--'}</td>
                        </tr>
                        <tr>
                            <th>链接</th>
                            <td>
                                <ul>
                                    <li><a href={'https://zh.wikipedia.org/wiki/' + obj.binomial} target="_blank">维基百科</a></li>
                                    <li><a href={'http://baike.baidu.com/item/' + obj.cnName} target="_blank" style="font-size: 12px;">百度百科(仅供参考...)</a></li>
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
                <div className="Detail-data">
                    {
                        this.makeData(this.props.obj)
                    }
                </div>
                <div className="Detail-intro">
                    <p>* 本站数据整理自 <a href="http://www.forestry.gov.cn/portal/wlmq/s/3585/content-567634.html">中国林业网</a> ，如有疏漏或问题，请及时联系 <a href="https://github.com/konrumi/cites-lookup">作者</a> ，非常感谢！</p>
                    <p>* 本站开发基于React，若您遇到兼容性问题无法使用，请尝试打开浏览器的“快速模式”，或尝试升级浏览器，谢谢！</p>
                    <p>* 本站数据仍在整理中，尚不完善，请暂勿作为参考，谢谢！</p>
                </div>
            </div>
        );
    }
}

export default Detail;
