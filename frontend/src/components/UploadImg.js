import React, { Component } from 'react'
import axios from 'axios'
import alertify from 'alertifyjs'
import 'alertifyjs/build/alertify.min.js'
import 'alertifyjs/build/css/alertify.min.css'
import 'alertifyjs/build/css/themes/default.min.css'

export class CreateUser extends Component {
    state = {
        images: [],
        id: 0,
        name: "",
        created_at: new Date(),
        selectedFile: null
    }


    onInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }
    onFileSelected = (e) => {
        this.setState({
            [e.target.name]: e.target.files[0]
        })

    }
    onSubmit = async (e) => {
        console.log(this.state.selectedFile)
        e.preventDefault();        
        const newImage = new FormData();
        newImage.append('image', this.state.selectedFile);
        newImage.append('nombre', this.state.name);

        const response = await axios.post(process.env.REACT_APP_API_URL+'/image', newImage);
        console.log(Response)

        if (response.data['status'] === 'img saved') {
            alertify.success('imagen creada con exito');
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
                        <form
                            encType="multipart/form-data"
                            onSubmit={this.onSubmit}
                        >
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
                                    type="file"
                                    name="selectedFile"
                                    className="form-control"
                                    onChange={this.onFileSelected}
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
