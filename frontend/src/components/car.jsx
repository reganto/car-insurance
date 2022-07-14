import axios from 'axios';
import { Component } from 'react';

export default class Car extends Component {
    state = {
        cars: [],
        activeItem: {},
    }
    async componentDidMount() {
        const { data: cars } = await axios.get("http://127.0.0.1:8000/api/v1/");
        this.setState({ cars });
    }
    handleDelete = async (car) => {
        let cars = [...this.state.cars];
        cars = cars.filter(c => c.id !== car.id);
        this.setState({ cars });
        await axios.delete(`http://127.0.0.1:8000/api/v1/${car.id}/`);
    }
    handleChange = ({ currentTarget: input }) => {
        let activeItem = { ...this.state.activeItem };
        activeItem[input.name] = input.value;
        this.setState({ activeItem });
    }
    handleAddRow = () => {
        const new_row = {
            make: <input type="text" name="make" id="make" onChange={this.handleChange} />,
            model: <input type="text" name="model" id="model" onChange={this.handleChange} />,
            color: <input type="text" name="color" id="color" onChange={this.handleChange} />,
            serial: <input type="text" name="serial" id="serial" onChange={this.handleChange} />,
            number_plate: <input type="text" name="number_plate" id="number_plate" onChange={this.handleChange} />
        }
        let cars = [...this.state.cars, new_row];
        this.setState({ cars });
    }
    handleSave = async () => {
        const { activeItem } = this.state;
        // check if activeItem is not empty
        if (JSON.stringify(activeItem) != '{}') {
            const { data: car } = await axios.post("http://localhost:8000/api/v1/", activeItem);
            let cars = [...this.state.cars];
            cars.splice(-1); // remove inputs row
            cars = [...cars, car];
            this.setState({ cars });
        }
    }
    render() {
        const { cars } = this.state;
        return (
            <div>
                <h2>Car Insurance</h2>
                <table className='table table-hover'>
                    <thead>
                        <tr>
                            <th>Make</th>
                            <th>Model</th>
                            <th>Color</th>
                            <th>Serial</th>
                            <th>Number Plate</th>
                            <th className='table-active'>#</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map((car, index) => (
                            <tr key={index}>
                                <td>{car.make}</td>
                                <td>{car.model}</td>
                                <td>{car.color}</td>
                                <td>{car.serial}</td>
                                <td>{car.number_plate}</td>
                                <td>
                                    <button className='btn btn-danger' onClick={() => this.handleDelete(car)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td className='table-active'>
                                Actions
                            </td>
                            <td>
                                <button className='btn btn-warning' onClick={this.handleAddRow}>Add Row</button>
                            </td>
                            <td>
                                <button className='btn btn-success' onClick={this.handleSave}>Save</button>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div >
        );
    }
}
