/**
 * @Description: 详情页面
 * @author: forguo
 * @date: 2020/8/27
 */
import React, {Component} from "react";
import {InputItem, TextareaItem, Button, Toast, Modal} from 'antd-mobile';
import {connect} from "react-redux";
import './_Index.scss';
import {dispatchSubmit} from "../../store/actions";

const alert = Modal.alert;

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            name: '',
            department: '',
            area: '',
            content: '',
            loading: false
        }
    }
    componentDidMount() {
        const {
            visible
        } = this.props;
        const element = document.getElementById('detail');
        try {
            element.addEventListener('transitionend', handle, false);
        } catch (e) {
            console.log(e);
        }
        function handle() {
            if (visible) {
                document.getElementById('index').style.position = 'fixed';
                document.getElementById('index').style.overflow = 'hidden';
            } else {
                document.getElementById('index').style.position = 'static';
                document.getElementById('index').style.overflow = 'auto';
            }
        }
    }

    onChange (name, value) {
        this.setState({
            [name]: value
        })
    }

    onBlur () {
        // document.documentElement.scrollTop = 0;
    }

    onSubmit () {
        Toast.loading('加载中...', 0);
        const {
            name,
            department,
            area,
            content,
            loading
        } = this.state;
        if (!name) {
            Toast.info('请输入您的姓名！');
            return false;
        }
        if (!department) {
            Toast.info('请输入您的工作单位！');
            return false;
        }
        if (!area) {
            Toast.info('请输入您的研究领域！');
            return false;
        }
        if (!content) {
            Toast.info('请输入您的答案！');
            return false;
        }
        const {
            detail,
        } = this.props;
        const {
            categoryId,
            qsId
        } = detail;
        this.setState({
            loading: true
        }, async () => {
            if (loading) {
                return false;
            }
            try {
                let res = await this.props.dispatchSubmit({
                    categoryId,
                    qsId,
                    name,
                    department,
                    area,
                    content,
                });
                console.log(res);
                alert('提示', '提交成功！', [
                    {text: '我知道了'},
                ]);
                this.setState({
                    name: '',
                    department: '',
                    area: '',
                    content: '',
                    loading: false
                });
                Toast.hide();
            } catch (e) {
                console.log(e);
                alert('提示', e.msg || '提交失败，请再试！', [
                    {text: '我知道了'},
                ]);
                this.setState({
                    loading: false
                });
                Toast.hide();
            }
        });
    }

    render() {
        const {
            name,
            department,
            area,
            content,
            loading
        } = this.state;
        const {
            visible
        } = this.props;
        let style = {
            transform: visible ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
            transition: 'ease-in-out transform 300ms'
        };
        return (
            <div className='page detail' style={style} id='detail'>
                {
                    visible &&
                    <div className="detail-inner">
                        <div className="quest-form">
                            <InputItem
                                maxLength={15}
                                type="text"
                                placeholder="请输入您的姓名"
                                onChange={this.onChange.bind(this, 'name')}
                                onBlur={this.onBlur.bind(this)}
                                value={name}
                            >姓 名：</InputItem>

                            <InputItem
                                maxLength={20}
                                type="text"
                                placeholder="请输入您的工作单位"
                                onChange={this.onChange.bind(this, 'department')}
                                onBlur={this.onBlur.bind(this)}
                                value={department}
                            >工作单位：</InputItem>

                            <InputItem
                                maxLength={50}
                                type="text"
                                placeholder="请输入您的研究领域"
                                onChange={this.onChange.bind(this, 'area')}
                                onBlur={this.onBlur.bind(this)}
                                value={area}
                            >研究领域：</InputItem>

                            <TextareaItem
                                maxLength={300}
                                rows={5}
                                title="答案"
                                onChange={this.onChange.bind(this, 'content')}
                                onBlur={this.onBlur.bind(this)}
                                value={content}
                                placeholder="请输入您的答案"
                            />

                            <div className="btn-box">
                                <Button size={'small'} type={'primary'} loading={loading} onClick={this.onSubmit.bind(this)}>{loading ? '提交中...' : '提交'}</Button>
                            </div>
                        </div>
                    </div>
                }
                <span onClick={this.props.onCloseDetail.bind(this)} className="back-btn">返回上级</span>
            </div>
        );
    }
}

export default connect((state) => ({
    list: state.list,
}), {
    dispatchSubmit,
})(Detail);
