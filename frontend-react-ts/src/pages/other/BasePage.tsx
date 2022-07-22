import React from "react";
import { Breadcrumb } from 'antd';
import "./BasePage.css";
import {Link} from "react-router-dom";
export type MyProps = {
    title?: string,
    navPath: string[],
    buttons?: JSX.Element[],
    content?: JSX.Element
}

export default class BasePage extends React.Component<MyProps> {

    titleRender() {
        return <h1>{this.props.title}</h1>
    }

    navPathRender() {
        const children: JSX.Element[] = []
                this.props.navPath.map((res: string) => {
                    const index = this.props.navPath.indexOf(res);
                    const length = this.props.navPath.length-1;
                    const element = length == index ? res : <Link to={"/"+res}>{res}</Link>
                    children.push(<Breadcrumb.Item>
                        {element}
                    </Breadcrumb.Item>)
                })
        return <Breadcrumb>
            {children}
        </Breadcrumb>
    }

    buttonRender() {
        return <span>{this.props.buttons}</span>
    }

    contentRender() {
        return <div  className="top-margin">
            {this.props.content}
        </div>
    }
    render() {
        return (
            <div>
                {this.titleRender()}
                <div className="rowC">
                    <div className={"left"}>
                        {this.props.navPath != null ? this.navPathRender() : null}
                    </div>
                    <span className="right">
                        {this.buttonRender()}
                    </span>
                </div>
                {this.contentRender()}
            </div>
        );
    }
}