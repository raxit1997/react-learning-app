import { IonContent, IonPage, IonButton } from '@ionic/react';
import React from 'react';
import ReactDom from 'react-dom';
import Employee from '../components/Employee';
import './Home.css';
import * as request from 'request';
import { HomeState } from '../interfaces/Home/HomeState';
import { Users } from '../components/Users/Users';

class Home extends React.Component<{}, HomeState> {

  timerInterval: any;

  constructor(public props: any) {
    super(props);
    this.state = {
      currentDate: new Date(),
      message: 'Hello',
      selectedUser: undefined,
      userList: [],
      renderUsersComponent: false
    };
  }

  componentDidMount() {
    this.timerInterval = setInterval(() => this.timer(), 1000)
    setTimeout(() => {
      this.setState({
        message: 'World'
      });
    }, 5000);
  }

  timer() {
    this.setState({
      currentDate: new Date()
    });
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  fetchEmployeesData() {
    request.get('http://dummy.restapiexample.com/api/v1/employees', (error, response, body) => {
      const responseData = JSON.parse(body);
      const employeesData = responseData.data;
      const employeesDataElement = document.getElementsByClassName('employees-data')[0];
      ReactDom.render(<Employee employeesData={employeesData} />, employeesDataElement);
    })
  }

  receiveUser(user: any) {
    this.setState({
      selectedUser: user
    });
  }

  fetchUserDataFirstPage() {
    this.setState({ renderUsersComponent: false });
    request.get('https://reqres.in/api/users', (error, response, body) => {
      const responseData = JSON.parse(body);
      const userList = responseData.data;
      this.setState({
        userList: userList,
        renderUsersComponent: true
      })
    });
  }

  fetchUserDataSecondPage() {
    this.setState({ renderUsersComponent: false });
    request.get('https://reqres.in/api/users?page=2', (error, response, body) => {
      const responseData = JSON.parse(body);
      const userList = responseData.data;
      this.setState({
        userList: userList,
        renderUsersComponent: true
      })
    });
  }

  render() {
    return (
      <IonPage>
        <IonContent>
          <IonButton onClick={() => this.fetchUserDataFirstPage()}>
            First Page
          </IonButton>
          <IonButton onClick={() => this.fetchUserDataSecondPage()}>
            Second Page
          </IonButton>
          <p>Current Time: { this.state.currentDate.toLocaleTimeString() }</p>
          <p>Message: { this.state.message }</p>
          <div>
            {
              this.state.selectedUser ? <p>Selected User Email ID: {this.state.selectedUser.email}</p> : null
            }
          </div>
          <div className="employees-data"></div>
          <div className="user-data">
            {
              this.state.userList && this.state.userList.length > 0 && this.state.renderUsersComponent ? <Users sendUser={this.receiveUser.bind(this)} userList={this.state.userList} /> : null
            }
          </div>
        </IonContent>
      </IonPage>
    );
  }

};

export default Home;
