import { IonContent, IonPage, IonButton } from '@ionic/react';
import React from 'react';
import ReactDom from 'react-dom';
import Employee from '../components/Employee';
import './Home.css';
import * as request from 'request';
import { HomeState } from '../interfaces/Home/HomeState';

class Home extends React.Component<{}, HomeState> {

  timerInterval: any;

  constructor(public props: any) {
    super(props);
    this.state = {
      currentDate: new Date(),
      message: 'Hello'
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

  render() {
    return (
      <IonPage>
        <IonContent>
          <IonButton onClick={() => this.fetchEmployeesData()}>
            Submit
            </IonButton>
          <p>Current Time: { this.state.currentDate.toLocaleTimeString() }</p>
          <p>Message: { this.state.message }</p>
          <div className="employees-data"></div>
        </IonContent>
      </IonPage>
    );
  }

};

export default Home;
