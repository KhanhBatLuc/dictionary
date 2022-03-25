import React, { Component } from 'react'
import { authHeader } from '../helpers';
import { authenticationService } from '../services/authentication.service';
import  '../css/dict.png'
export default class HeaderWeb extends Component {

    state = {
        email: "",
        name: "",
        userId: "",
        login: false,
    }

    componentWillMount() {
        if (authenticationService.currentUserValue) {
            fetch(`http://localhost:3001/api/me`, {
                method: 'GET',
                headers: authHeader(),
                credentials: 'include',

            })
                .then((res) => { return res.json(); })
                .then((data) => {
                    if (data._id) {
                        this.setState({
                            login: true,
                            email: data.email,
                            name: data.name,
                            userId: data._id
                        });
                    }
                    else {
                        this.setState({
                            login: false,
                            email: "",
                            name: "",
                            userId: ""
                        })
                        authenticationService.logout();
                    }

                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    logout = (event) => {
        authenticationService.logout();
        this.setState({
            login: false,
            email: "",
            name: "",
            userId: ""
        })
    }

    render() {
        return (
            <div>
                <header className="section-header" style={{ top: 0 }}>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" >
                        <a className="navbar-brand" href="/">
                            <img src="dict.png" alt="" />
                        </a>
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Home <span className="sr-only"></span></a>
                                </li>
                                {(this.state.login)
                                    ?
                                    <li className="nav-item">
                                        <a className="nav-link" href="/learning">Word Groups</a>
                                    </li>
                                    :
                                    <div></div>
                                }
                                <li className="nav-item">
                                        <a className="nav-link" href="/translate">Translate</a>
                                    </li>

                            </ul>


                        </div>
                        {(this.state.login) ?
                            <ul className="nav navbar-nav navbar-right" >
                                <li onClick={this.logout}><a href="/"> Logout</a></li>
                            </ul>
                            :
                            <ul className="nav navbar-nav navbar-right" >
                                <li><a href="/login">Login</a></li>
                            </ul>
                        }
                    </nav>
                </header>
            </div>
        )
    }
}