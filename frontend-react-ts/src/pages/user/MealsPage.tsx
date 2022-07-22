import React from "react";

import BasePage from "../other/BasePage";
import Button from "react-bootstrap/Button";
import {Link} from "react-router-dom";
import {BackButton} from "../../App";
import axios from "axios";
import Meal from "../../models/Meal";
import List from "../../components/list/List";
import Loading from "../../components/loading/Loading";

type MyProps = {

}
type MealState = {
    meals: Meal[],
    mealsLoaded: boolean
}

 export default class MealsPage extends React.Component<MyProps, MealState> {
    state: MealState = {
        meals: [],
        mealsLoaded: false
    }
    componentDidMount() {
        // Simple GET request using axios
        axios.get("http://localhost:8080/api/restaurants/1/meals")
            .then(res => {
                const json = res.data;
                this.setState({
                    meals: json,
                    mealsLoaded: true
                });
                {console.log(this.state.meals)}
            })
    }
    render() {
        if (!this.state.mealsLoaded) {
            return <Loading/>
        }
        return (
            <BasePage
                key={"Meals"}
                title={"Meals"}
                navPath={["Restaurants", "Meals"]}
                buttons={[
                    <Link
                        to="/newMeal">
                        <Button>
                            New Meal
                        </Button>
                    </Link>,
                    <BackButton/>
                ]}
                content={
                    <List
                        items={this.state.meals}
                        emptyText={"Keine Einträge"}
                    ></List>
                }
            />
        );
    }
}