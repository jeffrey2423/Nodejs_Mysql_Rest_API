import React, { Component } from 'react'
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/alertify.min.js'
import 'alertifyjs/build/css/alertify.min.css'
import 'alertifyjs/build/css/themes/default.min.css'

export class CreateUser extends Component {
    state = {
        id: 0,
        name: "",
        salary: ''
    }

    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    onSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            id: this.state.id,
            name: this.state.name,
            salary: parseInt(this.state.salary)
        }
        console.log(this.state.salary)
        const response = await axios.post('http://localhost:4000', newUser);
        console.log(Response)

        if (response.data['status'] === 'Employeed Saved') {
            alertify.success('Usuario creado con exito');
            //window.location.href = '/';
        } else {
            alertify.error('Ocurrio un error intenta de nuevo');
        }

    }
    render() {
        return (
            <div className="col-md-5">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Nombre"
                                    className="form-control"
                                    onChange={this.onInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="salary"
                                    placeholder="salario"
                                    className="form-control"
                                    onChange={this.onInputChange}
                                />
                            </div>
                            <button
                                className="btn btn-primary"
                                type="submit"
                            >
                                Registar
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        )
    }
}

export default CreateUser
