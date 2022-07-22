import React from "react";
import BasePage from "../other/BasePage";
import {BackButton} from "../../App";
import {Button, Form, Input, Select} from "antd";
import Restaurant from "../../models/Restaurant";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import Meal from "../../models/Meal";
import {PendingState} from "../../models/ApprovableBaseModel";

type MyState = {
    restaurants: Restaurant[]
    restaurantsLoaded: boolean
    optionsRestaurant: React.ReactNode[]
}
export default class NewMealPage extends React.Component<{}, MyState> {
    state: MyState = {
        restaurants: [],
        restaurantsLoaded: false,
        optionsRestaurant: []
    }

    save(meal: Meal) {
        axios.post("http://localhost:8080/api/meals/", meal).then(r => {

            console.log(r.status + " Meal saved")
        })
    }

    onFinish = (values: any) => {
        console.log(values)
        const restaurant = this.state.restaurants.find(meal => meal.name ===
            values["restaurant"])
        if(restaurant != undefined){
            this.save(
                new Meal(
                    -1,
                    values["username"],
                    restaurant.id,
                    "",
                    PendingState.UNAPPROVED
                )
            )
        }
    }

    onFinishFailed = (errorInfo: any) => {
        console.log(errorInfo)
    }

    onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    onSearch = (value: string) => {
        console.log('search:', value);
    };

    componentDidMount() {
        // Simple GET request using axios
        axios.get("http://localhost:8080/api/restaurants")
            .then(res => {
                const json = res.data;
                const children: JSX.Element[] = []
                json.map((res: Restaurant) => {
                    children.push(<Select.Option key={res.id.toString()}
                                                 value={res.name.toString()}>{res.name}</Select.Option>)
                })
                this.setState({
                    restaurants: json,
                    restaurantsLoaded: true,
                    optionsRestaurant: children
                });
                {
                    console.log(this.state.restaurants)
                }
            })
    }

    render() {
        if (!this.state.restaurantsLoaded) {
            return <Loading/>
        }
        return (
            <BasePage
                title={"New Meal"}
                navPath={["Restaurants", "Meals", "New Meal"]}
                buttons={[
                    <BackButton/>
                ]}
                content={
                    <Form
                        name="basic"
                        labelCol={{span: 8}}
                        wrapperCol={{span: 10}}
                        initialValues={{remember: true}}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name of meal"
                            name="username"
                            rules={[{required: true, message: 'Please input the name of the meal!'}]}
                        >
                            <Input/>
                        </Form.Item>

                        <Form.Item
                            label="Restaurant"
                            name="restaurant"
                            rules={[{required: true, message: 'Please select a restaurant!'}]}
                        >
                            <Select
                                showSearch
                                placeholder="Select a person"
                                optionFilterProp="children"
                                onChange={this.onChange}
                                onSearch={this.onSearch}
                                filterOption={(input, option) =>
                                    (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
                                }>
                                {this.state.optionsRestaurant}
                            </Select>
                        </Form.Item>

                        <Form.Item wrapperCol={{offset: 8, span: 16}}>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                }
            />
        );
    }

}