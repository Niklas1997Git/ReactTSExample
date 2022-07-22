import React from "react";
import BasePage from "../other/BasePage";
import axios from "axios";
import Meal from "../../models/Meal";
import List from "../../components/list/List";
import {PendingState} from "../../models/ApprovableBaseModel";
import Restaurant from "../../models/Restaurant";
import Loading from "../../components/loading/Loading";

type MyProps = {}
type ReleaseState = {
    meals: Meal[]
    mealsLoaded: boolean
    restaurants: Restaurant[]
    restaurantsLoaded: boolean
}
export default class ReleasePage extends React.Component<MyProps, ReleaseState> {
    state: ReleaseState = {
        meals: [],
        mealsLoaded: false,
        restaurants: [],
        restaurantsLoaded: false
    }

    componentDidMount() {
        // Simple GET request using axios

        axios.get("http://localhost:8080/api/meals/unapproved")
            .then(res => {
                const json = res.data;
                this.setState({
                    meals: json,
                    mealsLoaded: true
                });
                {
                    console.log(this.state.meals)
                }
            }).catch(reason => {
                console.log(reason)
        })
        axios.get("http://localhost:8080/api/restaurants")
            .then(res => {
                const json = res.data;
                this.setState({
                    restaurants: json,
                    restaurantsLoaded: true
                });
                {
                    console.log(this.state.restaurants)
                }
            }).catch(reason => {
                console.log(reason)
        })
    }

    render() {
        if (!this.state.restaurantsLoaded && !this.state.restaurantsLoaded) {
            return <Loading/>
        }
        return (
            <BasePage
                title={"Release"}
                navPath={["Release"]}
                buttons={[]}
                content={
                    <p>
                        <List
                            items={this.state.meals}
                            emptyText={"Es sind noch keine Gerichte hinterlegt"}
                            release={true}
                        ></List>
                    </p>
                }
            />
        );
    }

}