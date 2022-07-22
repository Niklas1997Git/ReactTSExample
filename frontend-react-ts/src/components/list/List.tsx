import React from "react";
import {Badge, ListGroup} from "react-bootstrap";
import "./List.css";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import * as AiIcons from "react-icons/ai";
import ExampleModal from "../modal/Modal"
import BaseModel from "../../models/BaseModel";
import Meal from "../../models/Meal";
import axios from "axios";
import {PendingState} from "../../models/ApprovableBaseModel";

export type ListProps = {
    items: BaseModel[];
    badgeNumber?: number | undefined;
    emptyText?: String;
    release?: boolean;
    bottomText?: string;
    approve?: any;
}

export type ListState = {
    items: BaseModel[];
    badgeNumber: number | undefined
}

export default class List extends React.Component<ListProps, ListState> {
    state: ListState = {
        items: this.props.items,
        badgeNumber: this.props.badgeNumber
    }
    approve(meal: Meal){
        const index = this.state.items.findIndex(m => m == meal)
        const meals = this.state.items as Meal[];
        axios.put("http://localhost:8080/api/meals/approve/" + meal.id)
            .then((res) => res.data)
            .then((json) => {
                const updatedMeal = new Meal(json.id, json.name, json.restaurant, json.reason, json.pending)
                meals[index] = updatedMeal
                const newMeals = meals.filter(meal => meal.pending == PendingState.UNAPPROVED)
                console.log(newMeals)
                this.setState({
                    items: newMeals,
                    badgeNumber: undefined
                });
            })
    }
    render() {
        return (
            <ListGroup>
                {
                    this.state.items.length !== 0 ?
                        this.state.items.map((item) =>
                            <ListGroup.Item
                                action
                                key={item.id}
                                className="d-flex justify-content-between align-items-start"
                                as="li"
                            >
                                <Link className="ms-2 me-auto no-decorator"
                                      to={"/restaurants/" + item.id + "/meals"}>
                                    <div className="fw-bold">{item.id + ". " + item.name}</div>
                                    {this.props.bottomText}
                                </Link>
                                {this.props.release ? <Button onClick={() => this.approve(item as Meal)}><AiIcons.AiOutlineCheck /></Button>: null}
                                {this.props.release ? <ExampleModal
                                    openButtonText={<AiIcons.AiOutlineClose/>}
                                    bodyText={"Test body"}
                                    closeButtonText={"Close"}
                                    confirmButtonText={"Confirm"}
                                    title={"Ablehnen"}
                                ></ExampleModal> : null}
                                {this.props.badgeNumber !== 0 ? <Badge>{this.props.badgeNumber}</Badge> : null}
                            </ListGroup.Item>
                        ) :
                        <ListGroup.Item>
                            {this.props.emptyText}
                        </ListGroup.Item>
                }
            </ListGroup>
        );
    }
}