import React from "react";
import BasePage from "../other/BasePage";
import List from "../../components/list/List";
import axios from "axios";
import Restaurant from "../../models/Restaurant";
import Loading from "../../components/loading/Loading";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import { Button as Button2} from 'antd';

type ResState = {
    restaurants: Restaurant[]
    restaurantsLoaded: boolean
}
export default class RestaurantsPage extends React.Component {
    state: ResState = {
        restaurants: [],
        restaurantsLoaded: false
    }

    componentDidMount() {
        // Simple GET request using axios
        axios.get("http://localhost:8080/api/restaurants")
            .then(res => {
                const json = res.data;
                this.setState({
                    restaurants: json,
                    restaurantsLoaded: true
                });
                {console.log(this.state.restaurants)}
            })
    }

    render() {
        if (!this.state.restaurantsLoaded) {
            return <Loading/>
        }else {
            return (
                <BasePage
                    navPath={[]}
                    key={"Restaurants"}
                    title={"Restaurants"}
                    content={
                    <List
                        items={this.state.restaurants}
                        emptyText={"Keine Einträge"}
                    ></List>
                    }
                />
            );
        }
    }
}